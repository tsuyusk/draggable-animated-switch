import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Main from './Main'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Main />
    </GestureHandlerRootView>
  )
}

export default App
