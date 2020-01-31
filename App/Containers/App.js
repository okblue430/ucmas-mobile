import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { DefaultTheme, Provider as PaperProvider, Colors } from 'react-native-paper';
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1565C0',
    accent: '#1565C0',
    text: Colors.grey800
  },
};

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <RootContainer />
        </PaperProvider>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
