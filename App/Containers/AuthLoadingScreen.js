import React, { Component } from 'react'
import { 
  SafeAreaView,
  ActivityIndicator,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AuthActions from '../Redux/AuthRedux'
import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const {is_remember, user_temp_info} = this.props
    console.log({is_remember})
    if(is_remember){
      const now = Math.floor(Date.now() / 1000)
      if(now > user_temp_info.expired_auto_login) {
        // expired auto login
        this.props.navigation.navigate('SignInScreen')
      }else{
        const credential = {
          email: user_temp_info.email,
          password: user_temp_info.password
        }
        this.props.checkToken(credential)
      }
    }else{
      console.log("here")
      this.props.navigation.navigate('SignInScreen')
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.whiteContainer}>
          <View style={styles.focus_area}>
            <Image source={Images.logo} style={styles.logo_img} />
          </View>
          <ActivityIndicator size="large" color={Colors.main_color} style="marginTop: 80"/>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    is_remember: auth.is_remember,
    user_temp_info: auth.user_temp_info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkToken: (credential) => dispatch(AuthActions.checkToken(credential)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
