import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native'
import { Appbar, Button, Text } from 'react-native-paper';
import styles from './Styles/MainHeaderStyle'

export default class MainHeader extends Component {
  static propTypes = {
    nav: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      show_setting: false,
    }
  }
  _handleMenu = () => {
    this.props.nav.toggleDrawer()
  }
  render () {
    const {title} = this.props

    return (
      <View style={{zIndex: 1000}}>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={this._handleMenu} />
          <Appbar.Content title={title} />
        </Appbar.Header>
      </View>
    )
  }
}
