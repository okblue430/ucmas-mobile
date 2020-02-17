import React, { Component } from 'react'
import { 
  ScrollView, 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TextInput, 
  Text, 
  Linking, 
  TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AwesomeAlert from 'react-native-awesome-alerts'
import { SafeAreaView } from 'react-navigation'
// import DatePicker from 'react-native-datepicker'
// import RNPickerSelect from 'react-native-picker-select';
import AuthActions from '../Redux/AuthRedux'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Appbar } from 'react-native-paper';
// import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/RegisterScreenStyle'

const levels = [
  {key: 1, value: 1, label: 'Foundation Level'},
  {key: 2, value: 2, label: 'Basic Level'},
  {key: 3, value: 3, label: 'Elementary Level A'},
  {key: 4, value: 4, label: 'Elementary Level B'},
  {key: 5, value: 5, label: 'Intermediate Level A'},
  {key: 6, value: 6, label: 'Intermediate Level B'},
  {key: 7, value: 7, label: 'Higher Level A'},
  {key: 8, value: 8, label: 'Higher Level B'},
  {key: 9, value: 9, label: 'Grand Level A'},
  {key: 10, value: 10, label: 'Grand Level B'}
];

class RegisterScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      role: 'student',
      // primary_f_name: '', 
      // primary_l_name: '', 
      // dob: '',
      // level_id: null,
      // address: '',
      email: '',//bluedreampro2017@gmail.com
      // phone: '',
      // secondary_f_name: '',
      // secondary_l_name: '',
      showAlert: false,
    }
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // today = yyyy + '-' + mm + '-' + dd;
    // this.maxDate = today;
  }

  componentDidMount(){
    this.props.initStatesForAuthentication()
  }
  componentWillUnmount() {
    this.props.initStatesForAuthentication()
  }

  handleRegister = async () => {
    const { 
      role, 
      email,
    } = this.state

    if (email != '') {
      const credential = {
        role, 
        email,
        device_type: 'ios',
        push_token: "test_ios_push_token"
      }
      this.props.signInRequest(credential)
    } else {
      console.log(this.state)
      this.setState({ showAlert: true })
    }
  }

  _handleBack = () => {
    this.props.navigation.goBack()
  }

  handleChangeRole = (itemValue) => {
    this.setState({role: itemValue})
  }

  changePrimaryFName = (val) => {
    this.setState({primary_f_name: val})
  }
  changePrimaryLName = (val) => {
    this.setState({primary_l_name: val})
  }
  changeAddress = (val) => {
    this.setState({address: val})
  }
  changePhone = (val) => {
    this.setState({phone: val})
  }
  changeEmail = (val) => {
    this.setState({email: val})
  }
  changeSecondaryFName = (val) => {
    this.setState({secondary_f_name: val})
  }
  changeSecondaryLName = (val) => {
    this.setState({secondary_l_name: val})
  }

  handleCloseEmptyMessage = () => {
    this.setState({ showAlert: false })
  }

  handleError = () => {
    const {auth_error} = this.props
    if(auth_error == "email not exist"){
      this.props.initStatesForAuthentication()
      // go to ucmas.no
      const url = 'https://ucmas.no/search'
      Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
    }else{
      this.props.initStatesForAuthentication()
    }
  }

  handleTokenError = () => {
    this.props.initTokenError()
  }

  showStudentArea = () => {
    return (
      <View style={{flex:1}}>
        {/* <View style={styles.row_area}>
          <Text style={styles.lbl_category}>Student</Text>
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='First Name'
            value={this.state.primary_f_name}
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
            placeholder='Last Name'
            value={this.state.primary_l_name}
            onChangeText={this.changePrimaryLName}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='username'
            textContentType='givenName'
            style={styles.default_txt_input}
          />
        </View>
        <View style={styles.row_area}>
          <DatePicker
            style={{width: '100%'}}
            date={this.state.dob}
            mode="date"
            placeholder="Birthday"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate={this.maxDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                fontSize: 16,
                borderRadius: 5, 
                borderColor: '#ddd'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({dob: date})}}
          />
        </View>
        <View style={styles.row_area}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a Level',
              value: null,
              color: '#ddd',
            }}
            onValueChange={(value) => this.setState({level_id: value})}
            items={levels}
            value={this.state.level_id}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='Address'
            value={this.state.address}
            onChangeText={this.changeAddress}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='street-address'
            textContentType='fullStreetAddress'
            style={styles.default_txt_input}
          />
        </View>
        <View style={[styles.row_area, {marginTop: 10}]}>
          <Text style={styles.lbl_category}>Parent</Text>
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='First Name'
            value={this.state.secondary_f_name}
            onChangeText={this.changeSecondaryFName}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='username'
            textContentType='familyName'
            style={styles.default_txt_input}
          />
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='Last Name'
            value={this.state.secondary_l_name}
            onChangeText={this.changeSecondaryLName}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='username'
            textContentType='givenName'
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
        </View>*/}
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
      </View>
    )
  }
  showTeacherArea = () => {
    return (
      <View style={{flex:1}}>
        {/* <View style={styles.row_area}>
          <Text style={styles.lbl_category}>Teacher</Text>
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='First Name'
            value={this.state.primary_f_name}
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
            placeholder='Last Name'
            value={this.state.primary_l_name}
            onChangeText={this.changePrimaryLName}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='username'
            textContentType='givenName'
            style={styles.default_txt_input}
          />
        </View>
        <View style={styles.row_area}>
          <DatePicker
            style={{width: '100%'}}
            date={this.state.dob}
            mode="date"
            placeholder="Birthday"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate={this.maxDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                fontSize: 16,
                borderRadius: 5, 
                borderColor: '#ddd'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({dob: date})}}
          />
        </View>
        <View style={styles.row_area}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a Level',
              value: null,
              color: '#ddd',
            }}
            onValueChange={(value) => this.setState({level_id: value})}
            items={levels}
            value={this.state.level_id}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.row_area}>
          <TextInput
            placeholder='Address'
            value={this.state.address}
            onChangeText={this.changeAddress}
            keyboardType={'email-address'}
            autoCapitalize = 'none'
            autoCompleteType='street-address'
            textContentType='fullStreetAddress'
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
        </View> */}
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
      </View>
    )
  }

  render () {
    const {role} = this.state
    const {
      fetching,
      auth_error,
      token_error
    } = this.props
    const token_error_message = token_error != null ? token_error.message : ''
    const is_auth_error = auth_error == "" ? false : true;
    const auth_error_message = auth_error == "email not exist" ? "Email is not exist. Please signup in the website https://ucmas.no." : auth_error;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Appbar.Header>
            <Appbar.BackAction onPress={this._handleBack} />
            <Appbar.Content title='REGISTER' />
          </Appbar.Header>
        </View>
        <View style={styles.whiteContainer}>
          <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='position'>
              <View style={styles.focus_area}>
                <View style={styles.row_area}>
                  <View style={styles.flex_row}>
                    <Button mode={role == 'student' ? "contained" : "outlined"} onPress={() => this.handleChangeRole('student')} uppercase={true} style={styles.btn_role}>
                      Student
                    </Button>
                    <Button mode={role == 'student' ? "outlined" : "contained"} onPress={() => this.handleChangeRole('teacher')} uppercase={true} style={styles.btn_role}>
                      Teacher
                    </Button>
                  </View>
                </View>
                {role == 'student' ? this.showStudentArea() : this.showTeacherArea()}
                <Button mode="contained" onPress={this.handleRegister} uppercase={true} style={styles.default_button}>
                  Register
                </Button>
              </View>
            </KeyboardAvoidingView>
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
          show={token_error != null}
          showProgress={false}
          title={token_error_message}
          message="Please sign in."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={this.handleTokenError}
        />
      </SafeAreaView>
    )
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    color: 'black',
  },
});

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    fetching: auth.auth_fetching,
    auth_error: auth.auth_error,
    token_error: auth.token_error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInRequest: (credential) => dispatch(AuthActions.signInRequest(credential)),
    initStatesForAuthentication: () => dispatch(AuthActions.initStatesForAuthentication()),
    initTokenError: () => dispatch(AuthActions.initTokenError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
