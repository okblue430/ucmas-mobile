import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LessonActions from '../Redux/LessonRedux'
import { SafeAreaView } from 'react-navigation'
import MainHeader from '../Components/MainHeader'

// Styles
import styles from './Styles/LessonDetailScreenStyle'

class LessonDetailScreen extends Component {
  constructor(props) {
    super(props)

    this.showPlan = this.showPlan.bind(this)
  }

  showPlan(exercise_id){
    console.log("clicked exercise :" + exercise_id)
    // this.props.exerciseRequest({exercise_id})
  }

  renderLessonDetail = (item, index) => {
    const no = parseInt(index) + 1
    return (
      <TouchableOpacity onPress={() => this.showPlan(item.id)} key={index}>
        <View style={styles.ex_container}>
          <View style={styles.ex_no}><Text>{no}</Text></View>
          <View style={styles.ex_title}><Text>{item.ex_name}</Text></View>
          <View style={styles.ex_time}><Text>{item.ex_time} Mins</Text></View>
        </View>
      </TouchableOpacity> )
  }

  render () {
    const {
      lessons,
      exercises,
      activeLessonID
    } = this.props
    // get active lesson name
    const activeLesson = lessons.find( l => l.id == activeLessonID)
    console.log("activeLesson")
    console.log(activeLesson)
    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title={activeLesson.lesson_name} screen="LessonsDetailScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={{marginTop: 20}}>
              { exercises.length > 0 ? exercises.map((item, index) => {
                return this.renderLessonDetail(item, index)
              }) : <Text style={{textAlign: 'center'}}>There is no exercises.</Text>}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { lesson } = state
  return {
    lessons: lesson.lessons,
    activeLessonID: lesson.activeLessonID,
    exercises: lesson.exercises,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetailScreen)
