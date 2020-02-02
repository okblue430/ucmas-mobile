import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import ViewQuestionScreen from '../Containers/ViewQuestionScreen'
import AddQuestionScreen from '../Containers/AddQuestionScreen'
import PlanDetailScreen from '../Containers/PlanDetailScreen'
import LessonDetailScreen from '../Containers/LessonDetailScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import QuestionScreen from '../Containers/QuestionScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import CoreExperienceScreen from '../Containers/CoreExperienceScreen'
import LessonsScreen from '../Containers/LessonsScreen'
import AccomplishScreen from '../Containers/AccomplishScreen'
import AssignmentScreen from '../Containers/AssignmentScreen'
import MenuScreen from '../Containers/MenuScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import RegisterSuccessScreen from '../Containers/RegisterSuccessScreen'
import VerifyScreen from '../Containers/VerifyScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SignInScreen from '../Containers/SignInScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import { Metrics } from '../Themes'

// Manifest of possible screens
// const DrawerStack = createDrawerNavigator({
//   HomeScreen: { screen: HomeScreen },
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'HomeScreen',
//   contentComponent: HomeScreen,
//   drawerWidth: Metrics.menuScreenWidth
// })

// const PrimaryNav = createStackNavigator({
//   ViewQuestionScreen: { screen: ViewQuestionScreen },
//   AddQuestionScreen: { screen: AddQuestionScreen },
//   PlanDetailScreen: { screen: PlanDetailScreen },
//   LessonDetailScreen: { screen: LessonDetailScreen },
//   ProfileScreen: { screen: ProfileScreen },
//   NotificationScreen: { screen: NotificationScreen },
//   QuestionScreen: { screen: QuestionScreen },
//   CalendarScreen: { screen: CalendarScreen },
//   CoreExperienceScreen: { screen: CoreExperienceScreen },
//   LessonsScreen: { screen: LessonsScreen },
//   AccomplishScreen: { screen: AccomplishScreen },
//   AssignmentScreen: { screen: AssignmentScreen },
//   LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LaunchScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })
const LessonStack = createStackNavigator({
  PageLesson: { screen: LessonsScreen },
  PageLessonDetail: { screen: LessonDetailScreen },
  PagePlanDetail: { screen: PlanDetailScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'PageLesson',
  defaultNavigationOptions: {
    headerStyle: styles.header
  },
  cardShadowEnabled: false,
  transitionConfig : () => ({
    containerStyle: {
    }
  })
})

const DrawerStack = createDrawerNavigator({
  PageHome: { screen: HomeScreen },
  PageAccomplish: { screen: AccomplishScreen },
  PageAssignment: { screen: AssignmentScreen },
  PageLessons: { screen: LessonStack },
  PageNotification: { screen: NotificationScreen },
  PageProfile: { screen: ProfileScreen },
  PageCalendar: { screen: CalendarScreen },
  PageCoreExperience: { screen: CoreExperienceScreen },
  PageQuestion: { screen: QuestionScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PageHome',
  contentComponent: MenuScreen,
  drawerWidth: Metrics.menuScreenWidth
})

const AppStack = createStackNavigator({
  DrawerStack: { screen : DrawerStack }
}, {
  headerMode: 'none',
  // headerMode: 'float',
  // defaultNavigationOptions: ({navigation}) => ({
  //   header: <CustomHeader nav={navigation} style={styles.screenBgColor2} stack={'AppStack'}/>
  // })
})

const AuthStack = createStackNavigator({
  PageSignIn: { screen: SignInScreen },
  PageRegister: { screen: RegisterScreen },
  PageVerify: { screen: VerifyScreen },
  PageRegisterSuccess: { screen: RegisterSuccessScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'PageSignIn',
  defaultNavigationOptions: {
    headerStyle: styles.header
  },
  cardShadowEnabled: false,
  transitionConfig : () => ({
    containerStyle: {
    }
  })
})

const PrimaryNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  }, {
    initialRouteName: 'AuthLoading'
  }
)


export default createAppContainer(PrimaryNav)
