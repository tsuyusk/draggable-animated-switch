import React, { useState, useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import styles from './styles'

const Main = () => {
  let offset = useRef(0).current
  const switchDotTranslateX = useRef(new Animated.Value(0)).current
  const raisingCircleScale = useRef(new Animated.Value(1)).current

  const handleHorizontalDrag = Animated.event(
    // https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/api/pan-gh
    [{ nativeEvent: { translationX: switchDotTranslateX } }],
    {
      useNativeDriver: true
    }
  )

  const handleHandlerStateChange = event => {
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

      Animated.timing(raisingCircleScale, {
        toValue: toValue === 0 ? 1 : 1000,
        duration: 500,
        useNativeDriver: true
      }).start()

      Animated.timing(switchDotTranslateX, {
        toValue,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        // setStates needs to be inside
        // Animated.timings's callback bc
        // itneeds the animation
        // to be finished for running.
        // otherwise, the component will be re-rendered
        // and the animation will be cropped

        if (toValue !== 0) {
          // Sets a start point for when the dot
          // is dragged to the right
          switchDotTranslateX.setOffset(toValue)
        }
      })
    }
  }

  return (
    <View style={styles.container}>
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
              }
            ]}
          />
        </PanGestureHandler>
      </View>

      <Animated.View
        style={[
          styles.raisingCircle,
          {
            transform: [
              {
                scale: raisingCircleScale
              }
            ]
          }
        ]}
      />
    </View>
  )
}

export default Main
