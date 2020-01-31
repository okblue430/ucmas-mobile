import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  focus_area: {
    margin: 20,
  },
  row_area: {
    flex: 1,
    marginVertical: 5
  },
})
