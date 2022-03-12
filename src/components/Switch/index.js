import React, { useRef, useState } from 'react'
import { View, Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import styles from './styles'

const Switch = ({ onFinishDrag }) => {
  let offset = useRef(0).current
  const switchDotTranslateX = useRef(new Animated.Value(0)).current
  const [isDragging, setIsDragging] = useState(false)

  const handleHorizontalDrag = Animated.event(
    // https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh
    [{ nativeEvent: { translationX: switchDotTranslateX } }],
    {
      useNativeDriver: true
    }
  )

  const handleHandlerStateChange = event => {
    if (event.nativeEvent.state == State.ACTIVE) {
      setIsDragging(true)
      return
    }

    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent

      let toValue

      if (offset === 64) {
        toValue = translationX <= -32 ? 0 : 64
      } else {
        toValue = translationX >= 32 ? 64 : 0
      }

      offset = toValue

      // Removes the possible offset coming from
      // the dot when it's dragged to the right
      if (toValue === 0) {
        switchDotTranslateX.flattenOffset()
      }

      onFinishDrag(toValue === 0 ? 'left' : 'right')

      Animated.timing(switchDotTranslateX, {
        toValue,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        if (toValue !== 0) {
          // Sets a start point for when the dot
          // is dragged to the right
          switchDotTranslateX.setOffset(toValue)
        }

        // setStates needs to be inside
        // Animated.timings's callback bc
        // itneeds the animation
        // to be finished for running.
        // otherwise, the component will be re-rendered
        // and the animation will be cropped

        setIsDragging(false)
      })
    }
  }

  return (
    <View style={styles.switch}>
      <PanGestureHandler
        onGestureEvent={handleHorizontalDrag}
        onHandlerStateChange={handleHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.switchDot,
            {
              transform: [
                {
                  translateX: switchDotTranslateX.interpolate({
                    inputRange: [0, 64],
                    outputRange: [0, 64],
                    extrapolate: 'clamp'
                  })
                }
              ]
            },
            isDragging
              ? {
                  elevation: 8
                }
              : null
          ]}
        />
      </PanGestureHandler>
    </View>
  )
}

export default Switch
