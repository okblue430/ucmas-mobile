import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ex_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15
  },
  ex_no: {
    width: 30
  },
  lesson_name: {
    width: 80
  },
  ex_title: {
    flex: 1,
  },
  ex_time: {
    width: 50
  }
})
