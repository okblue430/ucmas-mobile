import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LessonActions from '../Redux/LessonRedux'
import { SafeAreaView } from 'react-navigation'
import AwesomeAlert from 'react-native-awesome-alerts'
import MainHeader from '../Components/MainHeader'
import { List, Button } from 'react-native-paper';

// Styles
import styles from './Styles/LessonsScreenStyle'

class LessonsScreen extends Component {
  constructor(props) {
    super(props)

    this.showDetailLesson = this.showDetailLesson.bind(this)
  }

  showDetailLesson(lesson_id){
    console.log("clicked lesson detail :" + lesson_id)
    this.props.exerciseRequest({lesson_id})
  }

  renderLesson = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.showDetailLesson(item.id)} key={index}>
        <View style={{margin: 5}}>
          <List.Item
            title={item.lesson_name}
            description={item.lesson_description}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>
      </TouchableOpacity> )
  }
  render () {
    const {
      lessons,
      fetching
    } = this.props
    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title="LESSONS" screen="LessonsScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={{marginTop: 20}}>
              {lessons.map((item, index) => {
                return this.renderLesson(item, index)
              }) }
            </View>
          </ScrollView>
        </View>
        <AwesomeAlert
          show={fetching}
          showProgress={true}
          progressSize={'large'}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { lesson } = state
  return {
    fetching: lesson.fetching,
    lessons: lesson.lessons,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    exerciseRequest: (credential) => dispatch(LessonActions.exerciseRequest(credential)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsScreen)
