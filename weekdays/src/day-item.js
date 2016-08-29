import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  day: {
    fontSize: 18,
    color: '#0000FF'
  }
});

export default class DayItem extends Component {
  color() {
    // Checking for 0 so that we don't get Infinity
    let opacity = this.props.daysUntil === 0 ?  0 : (1 / this.props.daysUntil);
    return 'rgba(0,0,0,' + opacity + ')';
  }

  fontWeight() {
    let weight = 7 - this.props.daysUntil;
    return weight * 100;
  }

  fontSize() {
    return 60 - 6 * this.props.daysUntil;
  }

  lineHeight() {
    return 70 - 4 * this.props.daysUntil;
  }

  style() {
    return {
      color: this.color(),
      //the fontWeight should be a string?
      fontWeight: this.fontWeight() + '',
      fontSize: this.fontSize(),
      lineHeight: this.lineHeight()
    };
  }

  render() {
    return <Text style={this.style()}>
        {this.props.day}
      </Text>
  }
}
