import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { SafeAreaView } from 'react-navigation'
import MainHeader from '../Components/MainHeader'

// Styles
import styles from './Styles/AssignmentScreenStyle'

class AssignmentScreen extends Component {
  render () {
    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title="ASSIGNMENT" screen="AssignmentScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center'}}>
                Welcome this page.
              </Text>
            </View>
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentScreen)
