import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  content: {
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: 'flex-start'
  },
  button_active: {
    width: '100%', 
    backgroundColor: '#cab1ef'
  },
  menu_button: {
    height: 45,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  menu_item_area: {
    flex: 1
  },
  menu_item_txt: {
    fontSize: 20,
    lineHeight: 32,
    zIndex: 9,
    height: 32,
  },
  user_area: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar_area: {
    width: 45
  },
  username_area: {
    flex: 1,
    alignItems: 'flex-start'
  }
})
