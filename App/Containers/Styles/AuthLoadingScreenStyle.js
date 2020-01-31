import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo_img: {
    alignContent: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: 75
  },
  focus_area: {
    marginTop: 150,
    marginBottom: 80,
    marginHorizontal: 50,
  },
})
