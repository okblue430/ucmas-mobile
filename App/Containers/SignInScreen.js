import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { SafeAreaView } from 'react-navigation'
import { Button, Text } from 'react-native-paper';
// import RegisterScreen from '../Containers/RegisterScreen'
import { Images } from '../Themes'

// Styles
import styles from './Styles/SignInScreenStyle'

class SignInScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    console.log("here will unmount")
  }

  handleRegister = () => {
    console.log("go to register")
    this.props.navigation.navigate('PageRegister')
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.fullContainer}>
          <View style={styles.focus_area}>
            <Image source={Images.logo} style={styles.logo_img} />
            <Text style={{textAlign: 'center', marginTop: 5}}>UCMAS Abacas</Text>
            <Button mode="contained" onPress={this.handleRegister} uppercase={true} style={[styles.default_button, {marginTop: 150}]}>
              Register
            </Button>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
