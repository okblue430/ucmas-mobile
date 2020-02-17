import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title_area:{
    flexDirection: 'column',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tag_area:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  tag_button: {
    height: 30,
    marginVertical: 10,
    marginRight: 10,
    padding: 5,
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#545454',
  },
  time_area: {
    marginTop: 20, 
    marginBottom: 10, 
    marginHorizontal: 20,
    alignItems: 'flex-end',
  },
  time_counter:{
    alignContent: 'flex-end',
    width: 50,
    textAlign: 'right',
  },
  time_counter_expired:{
    alignContent: 'flex-end',
    width: 50,
    color: 'red',
    textAlign: 'right',
  },
  game_result_area: {
    width: 250,
  },
  res_cap_area: {
    flex: 1,
  },
  res_cap: {
    flex: 1,
    textAlign: 'left',
    fontSize: 22,
  },
  res_des_area: {
    width: 100,
  },
  res_des: {
    textAlign: 'right',
    fontSize: 22,
  },
  game1_update_area: {
    width: 150,
    // textAlign: 'center'
  },
  game1_formula_area: {
    flex: 1,
    alignItems: 'flex-start',
  },
  game1_formula: {
    fontSize: 22,
  },
  game1_val_area: {
    width: 60,
    alignItems: 'flex-end'
  },
  cap_txt: {
    fontSize: 22,
  },
  game1_res_input_area: {
    flex: 1,
  },
  game1_res_input: {
    fontSize: 22,
    height: 40, 
    textAlign: 'right',
    borderTopColor: 'gray', 
    borderBottomColor: 'gray', 
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})
