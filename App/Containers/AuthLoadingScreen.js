import React, { Component } from 'react'
import { 
  SafeAreaView,
  ActivityIndicator,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const {
      access_token,
      push_token,
      child
    } = this.props
    console.log({access_token})
    console.log({push_token})
    console.log(child)
    if(access_token && push_token != "" && child.id !== undefined){
      const credential = {
        access_token,
        push_token,
        user_id : child.id
      }
      this.props.checkToken(credential)
    }else{
      console.log("here")
      this.props.navigation.navigate('Auth')
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
    access_token: auth.access_token,
    push_token: auth.push_token,
    child: auth.child,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkToken: (credential) => dispatch(AuthActions.checkToken(credential)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
