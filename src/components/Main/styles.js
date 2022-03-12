import { StyleSheet, Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D4DFF',
    alignItems: 'center',
    justifyContent: 'center'
  },

  raisingCircle: {
    position: 'absolute',
    left: windowWidth / 2,
    top: windowHeight / 2,

    width: 2,
    height: 2,
    borderRadius: 2,

    marginLeft: -1,
    marginRight: -1,

    zIndex: -1,

    backgroundColor: '#b7b7ff'
  }
})

export default style
