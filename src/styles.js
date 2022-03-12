import { StyleSheet, Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D4DFF',
    alignItems: 'center',
    justifyContent: 'center'
  },

  switch: {
    width: 108,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 2,
    zIndex: 2
  },

  switchDot: {
    width: 36,
    height: 36,
    borderRadius: 36,

    backgroundColor: '#333',
    zIndex: 2
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
