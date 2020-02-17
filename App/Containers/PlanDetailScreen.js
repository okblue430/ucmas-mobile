import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native'
import { connect } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts'
import { SafeAreaView } from 'react-navigation'
import HTML from 'react-native-render-html';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import YoutubePlayer from 'react-native-youtube-iframe';
import MainHeader from '../Components/MainHeader'
import CompleteButton from '../Components/CompleteButton'
import { Title, Button } from 'react-native-paper';
import LessonActions from '../Redux/LessonRedux'

// Styles
import styles from './Styles/PlanDetailScreenStyle'

class PlanDetailScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exercise_id: 0,
      activeExercise: {},
      timer: null,
      minutes: '00',
      seconds: '00',
      testing_time: 0,
      expired: false,
      is_game_finish: false,
      is_game_content: false,
      ex_json: [],
      ex_filed_ct: 0,
      ex_game_cur_index: 1,
      game1_res_val: '',
      ct_question: 0,
      completed: 0,
      failed: 0,
      score: 0,
      showAlert: false,
    }

    this.timer_start = this.timer_start.bind(this)
    this.renderHTML = this.renderHTML.bind(this)
    this.renderVideo = this.renderVideo.bind(this)
    this.renderGame1 = this.renderGame1.bind(this)
    this.onHandleComplete = this.onHandleComplete.bind(this)
    this.onHandleNext = this.onHandleNext.bind(this)
    this.updateGame1Content = this.updateGame1Content.bind(this)
    this.onChangeGame1ResVal = this.onChangeGame1ResVal.bind(this)
  }
  componentDidMount(){
    const {
      navigation
    } = this.props
    const exercise_id = navigation.getParam('exercise_id', 0); // default value 0 
    // const activeExercise = exercises.find( l => l.id == exercise_id)
    const activeExercise = navigation.getParam('activeExercise');
    console.log("activeExercise")
    console.log(activeExercise)
    if(activeExercise != undefined){
      const minutes = activeExercise.ex_time
      let is_game_content = false
      let ex_json = []
      let ex_filed_ct = 0
      if(activeExercise.exercise_type.toLowerCase() === "game1") {
        const ex_content = activeExercise.ex_content
        is_game_content = ex_content == "" ? false : true
        if(is_game_content){
          ex_json = JSON.parse(ex_content)
          ex_filed_ct = ex_json[0].params.length
        }
      }
      
      setTimeout(()=>this.timer_start(), 100)
      this.setState({exercise_id, activeExercise, minutes, is_game_content, ex_json, ex_filed_ct})
    }
  }
  componentWillUnmount() {
    // this.props.initStatesForAuthentication()
    clearInterval(this.state.timer)
  }

  timer_start() {
    const self = this
    let timer = setInterval(()=>{
      var testing_time = this.state.testing_time
      testing_time ++
      var expired = this.state.expired
      if( Number(this.state.minutes) == 0 && Number(this.state.seconds) == 0){
        expired = true
      }
      let i_seconds = (Number(this.state.seconds) - 1).toString()
      let i_minutes = this.state.minutes
      if( Number(this.state.seconds) == 0 ) {
        i_minutes = (Number(this.state.minutes) - 1).toString()
        i_seconds = '59'
      }
      self.setState({
        minutes: i_minutes !== undefined && i_minutes.length == 1 ? '0'+i_minutes: i_minutes,
        seconds: i_seconds !== undefined && i_seconds.length == 1 ? '0'+i_seconds : i_seconds,
        expired,
        testing_time,
      })
    }, 1000)
    this.setState({timer})
  }

  onHandleComplete(){
    clearInterval(this.state.timer)
    console.log("this.state.testing_time")
    console.log(this.state.testing_time)
    this.setState({showAlert: true})
    this.props.navigation.pop()
  }
  onHandleNext(){
    const { 
      is_game_finish, 
      ex_game_cur_index, 
      ex_json,
      ct_question,
      completed,
      failed,
      score,
      game1_res_val
    } = this.state
    let temp_is_game_finish = is_game_finish
    let temp_ex_game_cur_index = ex_game_cur_index
    let temp_completed = completed
    let temp_failed = failed
    let temp_ct_question = ct_question
    let temp_score = score
    let answer = 0
    const formula = ex_json[ex_game_cur_index-1].formula
    let temp_index = 0
    for( var k of ex_json[ex_game_cur_index-1].params ) {
      var temp = Number(k);
      if(temp_index == 0) answer = temp;
      else {
          switch(formula) {
              case "+":
                  answer += temp;
                  break;
              case "-":
                  answer -= temp;
                  break;
              case "*":
                  answer = answer * temp;
                  break;
              case "/":
                  answer = answer / temp;
                  break;
          }
      }
      temp_index ++;
    }
    if(ex_game_cur_index == ex_json.length){
      temp_is_game_finish = true
    }else{
      temp_ex_game_cur_index ++
    }
    temp_ct_question ++
    if(answer == Number(game1_res_val)) {
      temp_completed ++
    }else{
      temp_failed ++
    }
    if(temp_ct_question > 0) {
      temp_score = (temp_completed / temp_ct_question * 100).toFixed(2)
    }
    
    this.setState({
      is_game_finish: temp_is_game_finish, 
      ex_game_cur_index: temp_ex_game_cur_index, 
      ct_question: temp_ct_question,
      completed: temp_completed,
      failed: temp_failed,
      score: temp_score,
      game1_res_val: ''
    })
  }
  onChangeGame1ResVal(val){
    this.setState({game1_res_val: val})
  }

  renderHTML() {
    const { activeExercise } = this.state
    const ex_content = activeExercise.ex_content
    const imagesMaxWidth = Dimensions.get('window').width - 40
    return (
      <View>
        <HTML html={ex_content} imagesMaxWidth={imagesMaxWidth} />
        <CompleteButton title="Complete" onAction={() => this.onHandleComplete()} />
      </View>
    )
  }
  renderVideo() {
    const { activeExercise } = this.state
    const ex_content = activeExercise.ex_content
    const videoHeight = Number(Dimensions.get('window').width * 9 / 16)
    // https://www.youtube.com/watch?v=vlDzYIIOYmM
    const youtubeId = ex_content.replace("https://www.youtube.com/watch?v=", "")
    return (
      <View>
        {youtubeId ? <YoutubePlayer
          height={videoHeight}
          videoId={youtubeId}
          play={true}
          webViewStyle={{alignSelf:'stretch', textAlign: 'center'}}
          volume={50}
          playbackRate={1}
          playerParams={{
            preventFullScreen: true,
            cc_lang_pref: "us",
            showClosedCaptions: true
          }}
        /> :
        <Text style={{textAlign:'center'}}>Invalid youtube video ID. Please contact to admin.</Text>}
        <CompleteButton title="Complete" onAction={() => this.onHandleComplete()} />
      </View>
    )
  }
  renderGame1() {
    const { is_game_content, ex_filed_ct } = this.state
    return (
      <View>
        {!is_game_content && <Text>There is no exercise content</Text>}
        {ex_filed_ct > 0 && this.updateGame1Content()}
      </View>
    )
  }
  updateGame1Content() {
    const { 
      is_game_finish, 
      ex_game_cur_index, 
      ex_json,
      ct_question,
      completed,
      failed,
      score,
      game1_res_val
    } = this.state
    // console.log({is_game_finish})
    // console.log(ex_json[ex_game_cur_index-1].params)
    return (
      <View style={styles.flex_row}>
        <Text style={{flex: 1}}>&nbsp;</Text>
        <View>
          {is_game_finish && <View style={styles.game_result_area}>
            <View style={styles.flex_row}>
              <View style={styles.res_cap_area}><Text style={styles.res_cap}>Questions</Text></View>
              <View style={styles.res_des_area}><Text style={styles.res_des}>{ct_question}</Text></View>
            </View>
            <View style={styles.flex_row}>
              <View style={styles.res_cap_area}><Text style={styles.res_cap}>Completed</Text></View>
              <View style={styles.res_des_area}><Text style={styles.res_des}>{completed}</Text></View>
            </View>
            <View style={styles.flex_row}>
              <View style={styles.res_cap_area}><Text style={styles.res_cap}>Failed</Text></View>
              <View style={styles.res_des_area}><Text style={styles.res_des}>{failed}</Text></View>
            </View>
            <View style={styles.flex_row}>
              <View style={styles.res_cap_area}><Text style={styles.res_cap}>Score</Text></View>
              <View style={styles.res_des_area}><Text style={styles.res_des}>{score}%</Text></View>
            </View>
            <CompleteButton title="Complete" onAction={() => this.onHandleComplete()} />
          </View>}
          {!is_game_finish && <View style={styles.game1_update_area}>
            {ex_json[ex_game_cur_index-1].params.map((item, key) => 
            (
              <View key={key} style={styles.flex_row}>
                <View style={styles.game1_formula_area}>
                  <Text style={styles.game1_formula}>{ex_json[ex_game_cur_index-1].params.length == key + 1 ? ex_json[ex_game_cur_index-1].formula : ''}</Text>
                </View>
                <View style={styles.game1_val_area}>
                  <Text style={styles.cap_txt}>{item}</Text>
                </View>
              </View>
            ))}
            <View style={styles.game1_res_input_area}>
              <TextInput
                style={styles.game1_res_input}
                onChangeText={this.onChangeGame1ResVal}
                value={game1_res_val}
              />
            </View>
            <CompleteButton title="Next" onAction={() => this.onHandleNext()} />
          </View>}
        </View>
        <Text style={{flex: 1}}>&nbsp;</Text>
      </View>
    )
  }
  handleCloseAlertMessage = () => {
    this.setState({ showAlert: false })
    // go to back page
    this.props.navigation.pop();
  }

  renderExercise = () => {
    const { activeExercise } = this.state
    if(activeExercise.exercise_type === "HTML"){
      return this.renderHTML()
    }else if(activeExercise.exercise_type === "Video"){
      return this.renderVideo()
    }else if(activeExercise.exercise_type.toLowerCase() === "game1"){
      return this.renderGame1()
    }
  }

  renderTitleArea = () => {
    const { activeExercise } = this.state
    const ex_tags = activeExercise.ex_tags
    const arr_tags = ex_tags == "" ? [] : ex_tags.split(",")
    return (
      <View style={styles.title_area}>
        <Title>{activeExercise.ex_name}</Title>
        <View style={styles.tag_area}>
        { arr_tags.length > 0 && arr_tags.map((tag, index) => {
          return (
            <Text key={index} style={styles.tag_button}>
              {tag}
            </Text>
          )
        })}
        </View>
      </View>
    )
  }
  renderTimeArea = () => {
    const { minutes, seconds, expired } = this.state
    return (
      <View style={styles.time_area}>
        {expired ? <Text style={styles.time_counter_expired}>Expired</Text> : <Text style={styles.time_counter}>{minutes}:{seconds}</Text>}
      </View>
    )
  }

  render () {
    const { exercise_id } = this.state
    return (
      <SafeAreaView style={styles.mainContainer} forceInset={{ bottom: 'never' }}>
        <View style={styles.whiteContainer}>
          <MainHeader nav={this.props.navigation} back={true} title="Plan Detail" screen="PlanDetailScreen" />
          {exercise_id !== 0 && this.renderTimeArea()} 
          <ScrollView style={[styles.container, styles.pageContainer]}>
            {exercise_id !== 0 && this.renderTitleArea()} 
            <View style={[styles.active_area, {marginVertical: 10}]}>
              { exercise_id !== 0 ? this.renderExercise() : (<Text style={{textAlign: 'center'}}>There is no Exercise.</Text>)}
            </View>
          </ScrollView>
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Alert"
          message="Completed current exercise."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#009BF2"
          onConfirmPressed={this.handleCloseAlertMessage}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  const { lesson } = state
  return {
    activeLessonID: lesson.activeLessonID,
    exercises: lesson.exercises,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetailScreen)
