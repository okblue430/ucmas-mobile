import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { SafeAreaView } from 'react-navigation'
import { Avatar } from 'react-native-paper';

// Styles
import styles from './Styles/MenuScreenStyle'

class MenuScreen extends Component {
  handleHome = () => {
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageHome')
  }

  handleAccomplish = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageAccomplish')
  }
  handleAssignment = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageAssignment')
  }
  handleLessons = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageLessons')
  }
  handleQuestions = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageQuestion')
  }
  handleProfile = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('PageProfile')
  }
  handleLogout = () => {
    // this.props.qrCodeScanInit()
    this.props.navigation.toggleDrawer()
    this.props.navigation.navigate('Auth')
  }
  render () {
    const {
      child,
    } = this.props
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.whiteContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.content}>
              <View style={styles.user_area}>
                <View style={styles.avatar_area}>
                  <Avatar.Text size={36} label="ED" />
                </View>
                <View style={styles.username_area}>
                  <Text style={{fontSize: 20}}>{child.first_name + " " + child.last_name}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.handleHome} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Home</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleAccomplish} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Accomplish</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleAssignment} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Assignment</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleLessons} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Lessons</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleQuestions} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Questions</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleProfile} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Profile</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleLogout} uppercase={false} style={styles.menu_button}>
                <View style={styles.menu_item_area}><Text style={styles.menu_item_txt}>Logout</Text></View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    child: auth.child
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)
