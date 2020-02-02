import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import CodeInput from 'react-native-confirmation-code-input';
import AwesomeAlert from 'react-native-awesome-alerts'
import { SafeAreaView } from 'react-navigation'
import { Button, Appbar } from 'react-native-paper';

// Styles
import styles from './Styles/VerifyScreenStyle'
import { Colors } from '../Themes';

class VerifyScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: '',
      showAlert: false,
    }
  }
  _handleBack = () => {
    this.props.navigation.goBack()
  }
  handleResend = () => {
    // send code again
    this.props.resendCodeRequest();
  }

  handleCloseEmptyMessage = () => {
    this.setState({ showAlert: false })
  }

  handleError = () => {
    this.props.initStatesForAuthentication()
  }

  handleCloseSuccessMessage = () => {
    this.props.initStatesForAuthentication()
  }

  _onFinishCheckingCode2 = (isValid, code) => {
    console.log(isValid) // code
    console.log(code)
    if(isValid != ""){
      const credential = {
        verify_code: isValid,
      }
      this.props.verifyCodeRequest(credential);
    }else{
      this.setState({showAlert: true});
    }
    // if(isValid) {
    //   this.props.resendCodeRequest();
    //   // this.props.navigation.navigate('PageRegisterSuccess')
    // }else{
    //   this.setState({showAlert: true});
    // }
  }

  render () {
    const {
      fetching,
      auth_error,
      auth_success
    } = this.props
    const is_auth_error = auth_error == "" ? false : true;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Appbar.Header>
            <Appbar.BackAction onPress={this._handleBack} />
            <Appbar.Content title='VERIFICATION' />
          </Appbar.Header>
        </View>
        <View style={styles.whiteContainer}>
          <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='position'>
              <View style={styles.focus_area}>
                <View style={styles.row_area}>
                  <Text style={{textAlign:'center', fontSize: 20}}>Input Verification Code</Text>
                </View>
                <View style={styles.row_area}>
                  <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    codeLength={6}
                    className='border-box'
                    activeColor={Colors.primary_color}
                    inactiveColor='rgba(49, 180, 4, 1.3)'
                    autoFocus={true}
                    space={25}
                    codeInputStyle={{ borderWidth: 1.5, fontSize: 24, borderColor: 'black', color: 'black' }}
                    onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                  />
                </View>
                <View style={[styles.row_area, {marginTop: 20}]}>
                  <Button mode="outline" onPress={this.handleResend} uppercase={false} style={styles.default_button}>
                    Try Send Verification Code
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Empty fields"
          message="Please input valid code."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={Colors.primary_color}
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
          message={auth_error}
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
          message="Verification code sent again."
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
    fetching: auth.auth_fetching,
    auth_error: auth.auth_error,
    auth_success: auth.auth_success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resendCodeRequest: () => dispatch(AuthActions.resendCodeRequest()),
    verifyCodeRequest: (credential) => dispatch(AuthActions.verifyCodeRequest(credential)),
    initStatesForAuthentication: () => dispatch(AuthActions.initStatesForAuthentication()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen)
