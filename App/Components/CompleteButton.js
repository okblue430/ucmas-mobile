import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';

import styles from './Styles/CompleteButtonStyle'

export default class CompleteButton extends Component {
  constructor(props) {
    super(props)

    this.handleAction = this.handleAction.bind(this)
  }
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
  }
  //
  // // Defaults for props
  static defaultProps = {
    title: "Complete"
  }

  handleAction(){
    this.props.onAction();
  }

  render () {
    const {title} = this.props
    return (
      <View style={styles.complete_btn_container}>
        <Button mode="contained" onPress={this.handleAction} uppercase={true} style={styles.default_button}>
          {title}
        </Button>
      </View>
    )
  }
}
