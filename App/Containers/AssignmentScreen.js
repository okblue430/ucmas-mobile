import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LessonActions from '../Redux/LessonRedux'
import { SafeAreaView } from 'react-navigation'
import MainHeader from '../Components/MainHeader'

// Styles
import styles from './Styles/AssignmentScreenStyle'

class AssignmentScreen extends Component {
  constructor(props) {
    super(props)

    this.showPlan = this.showPlan.bind(this)
  }

  showPlan(exercise_id) {
    console.log("clicked exercise :" + exercise_id)
    const {
      assignments,
    } = this.props
    const activeExercise = assignments.find( l => l.id == exercise_id)
    // this.props.exerciseRequest({exercise_id})
    this.props.navigation.push('PagePlanDetail', {exercise_id, activeExercise})
  }

  renderAssignment = (item, index) => {
    const no = parseInt(index) + 1
    const {
      lessons,
    } = this.props
    const lesson = lessons.find( l => l.id == item.lesson_id)
    return (
      <TouchableOpacity onPress={() => this.showPlan(item.id)} key={index}>
        <View style={styles.ex_container}>
          <View style={styles.ex_no}><Text>{no}</Text></View>
          <View style={styles.lesson_name}><Text>{lesson.lesson_name}</Text></View>
          <View style={styles.ex_title}><Text>{item.ex_name}</Text></View>
          <View style={styles.ex_time}><Text>{item.ex_time} Mins</Text></View>
        </View>
      </TouchableOpacity> )
  }

  render () {
    const {
      assignments,
    } = this.props
    // get active lesson name
    console.log("assignments")
    console.log(assignments)
    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} title="ASSIGNMENT" screen="AssignmentScreen" />
          <ScrollView style={[styles.container, styles.pageContainer]}>
            <View style={{marginTop: 20}}>
              { assignments.length > 0 ? assignments.map((item, index) => {
                return this.renderAssignment(item, index)
              }) : <Text style={{textAlign: 'center'}}>There is no assignments.</Text>}
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
    assignments: lesson.assignments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentScreen)
