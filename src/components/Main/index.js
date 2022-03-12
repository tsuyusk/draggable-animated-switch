import React, { useRef } from 'react'
import { View, Animated } from 'react-native'
import Switch from '../Switch'

import styles from './styles'

const Main = () => {
  const raisingCircleScale = useRef(new Animated.Value(1)).current

  const handleFinishSwitchDrag = direction => {
    Animated.timing(raisingCircleScale, {
      toValue: direction === 'left' ? 1 : 1000,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  return (
    <View style={styles.container}>
      <Switch onFinishDrag={handleFinishSwitchDrag} />

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
