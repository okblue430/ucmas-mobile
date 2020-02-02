import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import { SafeAreaView } from 'react-navigation'
import MainHeader from '../Components/MainHeader'
import AwesomeAlert from 'react-native-awesome-alerts'
import { Card, Title, Paragraph, Button } from 'react-native-paper';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  renderChild = (item, index) => {
      return <Card style={{margin: 5}} key={index}>
        <Card.Content>
          <Title>{item.first_name + "" + item.last_name}</Title>
          <Paragraph>LEVEL : {item.level_name}</Paragraph>
          <Paragraph>BIRTHDAY : {item.dob}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" style={styles.default_button}>SELECT</Button>
        </Card.Actions>
      </Card>
  }
  render () {
    const {
      fetching,
      auth_error,
      auth_success,
      child,
      children
    } = this.props

    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title="HOME" screen="HomeScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={{marginTop: 20}}>
              <Card.Title
                title="Active User"
                subtitle=""
              />
              <Card style={{margin: 5}}>
                <Card.Content>
                  <Title>{child.first_name + "" + child.last_name}</Title>
                  <Paragraph>LEVEL : {child.level_name}</Paragraph>
                  <Paragraph>BIRTHDAY : {child.dob}</Paragraph>
                </Card.Content>
              </Card>
            </View>
            <View style={styles.mainContainer} >
              {children.map((item, index) => {
                if(child.id != item.id){
                  return this.renderChild(item, index)
                }else{
                  return null
                }
              }) }
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
    fetching: auth.auth_fetching,
    auth_error: auth.auth_error,
    auth_success: auth.auth_success,
    child: auth.child,
    children: auth.children,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
