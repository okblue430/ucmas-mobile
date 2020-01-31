import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo_img: {
    alignContent: 'center',
    width: 300,
    height: 75,
    marginTop: 50,
    marginBottom: 10,
  },
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  focus_area: {
    display: 'flex',
    marginBottom: 30,
    marginHorizontal: 50,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  signup_view_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remember_area: {
    marginVertical: 10,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})
