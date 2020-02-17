import React, { Component } from 'react'
import { 
  ScrollView, 
  View, 
  TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AuthActions from '../Redux/AuthRedux'
import AwesomeAlert from 'react-native-awesome-alerts'
import { SafeAreaView } from 'react-navigation'
import MainHeader from '../Components/MainHeader'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { Colors } from '../Themes';

// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    const {
      child
    } = this.props
    
    let first_name = ''
    let last_name = ''
    if(child.member_type == 'teacher'){
      first_name = child.first_name
      last_name = child.last_name
    }else{
      first_name = child.parent_fname
      last_name = child.parent_lname
    }
    let email = child.email
    let phone = child.phone
    this.state = {
      primary_fname: first_name, 
      primary_lname: last_name, 
      email: email,
      phone: phone,
      showAlert: false,
    }
  }

  componentDidMount(){
    const {
      child
    } = this.props
    if(child.length > 0){
      console.log({child})
      let first_name = ''
      let last_name = ''
      if(child.member_type == 'teacher'){
        first_name = child.first_name
        last_name = child.last_name
      }else{
        first_name = child.parent_fname
        last_name = child.parent_lname
      }
      this.setState({
        primary_fname: first_name, 
        primary_lname: last_name, 
        email: child.email,
        phone: child.phone,
      })
    }
  }

  handleCloseEmptyMessage = () => {
    this.setState({ showAlert: false })
  }

  handleProfileUpdate = async () => {
    const { 
      primary_fname, 
      primary_lname, 
      email,
      phone,
    } = this.state
    const { child } = this.props
    if ( primary_fname != '' && 
         primary_lname != '' && 
         phone != '' && 
         email != '') {
      const credential = {
        parent_fname: primary_fname, 
        parent_lname: primary_lname, 
        email,
        phone,
        member_type: child.member_type
      }
      this.props.profileUpdateRequest(credential)
    } else {
      this.setState({ showAlert: true })
    }
  }
  changePrimaryFName = (val) => {
    this.setState({primary_fname: val})
  }
  changePrimaryLName = (val) => {
    this.setState({primary_lname: val})
  }
  changePhone = (val) => {
    this.setState({phone: val})
  }
  changeEmail = (val) => {
    this.setState({email: val})
  }
  handleError = () => {
    const {auth_error} = this.props
    this.props.initStatesForAuthentication()
  }
  handleCloseSuccessMessage = () => {
    this.props.initStatesForAuthentication()
  }

  render () {
    const {
      fetching,
      auth_error,
      auth_success,
    } = this.props

    const is_auth_error = auth_error == "" ? false : true;
    const auth_error_message = auth_error;

    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title="PROFILE" screen="ProfileScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={styles.focus_area}>
              <View style={styles.row_area}>
                <TextInput
                  placeholder='Parent First Name'
                  value={this.state.primary_fname}
                  onChangeText={this.changePrimaryFName}
                  keyboardType={'email-address'}
                  autoCapitalize = 'none'
                  autoCompleteType='username'
                  textContentType='familyName'
                  style={styles.default_txt_input}
                />
              </View>
              <View style={styles.row_area}>
                <TextInput
                  placeholder='Parent Last Name'
                  value={this.state.primary_lname}
                  onChangeText={this.changePrimaryLName}
                  keyboardType={'email-address'}
                  autoCapitalize = 'none'
                  autoCompleteType='username'
                  textContentType='givenName'
                  style={styles.default_txt_input}
                />
              </View>
              <View style={styles.row_area}>
                <TextInput
                  placeholder='Email'
                  value={this.state.email}
                  onChangeText={this.changeEmail}
                  keyboardType={'email-address'}
                  autoCapitalize = 'none'
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  style={styles.default_txt_input}
                />
              </View>
              <View style={styles.row_area}>
                <TextInput
                  placeholder='Phone'
                  value={this.state.phone}
                  onChangeText={this.changePhone}
                  keyboardType={'numeric'}
                  autoCapitalize = 'none'
                  autoCompleteType='tel'
                  textContentType='telephoneNumber'
                  style={styles.default_txt_input}
                />
              </View>
              <Button mode="contained" onPress={this.handleProfileUpdate} uppercase={true} style={styles.default_button}>
                Update
              </Button>
            </View>
          </ScrollView>
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Empty fields"
          message="Please fill out the fields."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#009BF2"
          onConfirmPressed={this.handleCloseEmptyMessage}
        />
        <AwesomeAlert
          show={fetching}
          showProgress={true}
          progressSize={'large'}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
        <AwesomeAlert
          show={is_auth_error}
          showProgress={false}
          title="Error"
          message={auth_error_message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Got it"
          onCancelPressed={this.handleError}
        />
        <AwesomeAlert
          show={auth_success}
          showProgress={false}
          title="Success"
          message="Profile updated successfully."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={Colors.primary_color}
          onConfirmPressed={this.handleCloseSuccessMessage}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    child: auth.child,
    fetching: auth.auth_fetching,
    auth_error: auth.auth_error,
    auth_success: auth.auth_success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profileUpdateRequest: (credential) => dispatch(AuthActions.profileUpdateRequest(credential)),
    initStatesForAuthentication: () => dispatch(AuthActions.initStatesForAuthentication()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
