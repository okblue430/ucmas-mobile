import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { DefaultTheme, Provider as PaperProvider, Colors } from 'react-native-paper';
// import { Provider } from 'react-redux'
import { Provider as StoreProvider} from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { PersistGate } from 'redux-persist/integration/react'

// create our store
const { store, persistor } = createStore()

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
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <RootContainer />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
