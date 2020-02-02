import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  focus_area: {
    margin: 20,
  },
  row_area: {
    flex: 1,
    marginVertical: 30
  },
  btn_role: {
    flex: 1,
    borderRadius: 0,
  },
  lbl_category: {
    fontSize: 22
  },
})
