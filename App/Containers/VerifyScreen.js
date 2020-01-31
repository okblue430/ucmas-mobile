import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
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
  }

  handleCloseEmptyMessage = () => {
    this.setState({ showAlert: false })
  }

  handleError = () => {
    this.props.initStatesForAuthentication()
  }

  handleTokenError = () => {
    this.props.initTokenError()
  }
  _onFinishCheckingCode2 = (isValid, code) => {
    console.log(isValid)
    console.log(code)
    if(isValid) {
      this.props.navigation.navigate('PageRegisterSuccess')
    }else{
      this.setState({showAlert: true});
    }
  }

  render () {
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
                    codeLength={5}
                    className='border-box'
                    compareWithCode='12345'
                    activeColor={Colors.primary_color}
                    inactiveColor='rgba(49, 180, 4, 1.3)'
                    autoFocus={true}
                    space='25'
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
          confirmButtonColor="#009BF2"
          onConfirmPressed={this.handleCloseEmptyMessage}
        />
        {/* <AwesomeAlert
          show={fetching}
          showProgress={true}
          progressSize={'large'}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
        <AwesomeAlert
          show={signin_error}
          showProgress={false}
          title="Error"
          message="There was problem signing in! Try again."
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
        /> */}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen)
