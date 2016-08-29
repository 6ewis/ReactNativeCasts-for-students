import React, {Component} from 'react';
import { TouchableHighlight, View, Text, AppRegistry, StyleSheet } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    alignItems: 'stretch'
  },
  header: { //yellow
    flex: 1
  },
  footer: { //blue
    flex: 1
  },
  timerWrapper: { //red
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { //green
    flex: 3,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60 
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      timeElapsed: null,
      running: false,
      laps: []
    };
  }

  render() {
    return <View style={styles.container}>
      <View style={[styles.header, this.border('yellow')]}>
        <View style={[this.border('red'), styles.timerWrapper]}>
          <Text style={styles.timer}> 
           {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[this.border('green'), styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer, this.border('blue')]}>
          {this.laps()}
      </View>
    </View>
  }

  laps() {
    //the author forgot the key
    return this.state.laps.map((time, index) => {
      return <View style={styles.lap} key={index}>
        <Text style={styles.lapText}> Lap #{index + 1} </Text>
        <Text style={styles.lapText}> {formatTime(time)} </Text> 
        </View>
    });
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({running: true, timeElapsed: new Date() - this.state.startTime});
    }, 30);
  }

  startStopButton() {
    let style = this.state.running ? styles.stopButton : styles.startButton;
    {/* onPress is needed to highlight as opposed to the previous React native version */}
    return <TouchableHighlight
      onPress={this.handleStartPress.bind(this)}
      style={[styles.button, style]}
      underlayColor="gray">
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>

  }

  handleLapPress() {
    let lap = this.state.timeElapsed;
    this.setState({laps: this.state.laps.concat([lap]), startTime: new Date()});
  }

  lapButton() {
    return <TouchableHighlight underlayColor="gray"
      onPress={this.handleLapPress.bind(this)}
      style={[styles.button]}>
        <Text>
           Lap
        </Text>
      </TouchableHighlight>
  }

  border(color) {
    return null;
    /* uncomment if you wanna see the separation of concern visually
    return {
      borderColor: color,
      borderWidth: 4
    }
    */
  }
}

AppRegistry.registerComponent('stopwatch', () => StopWatch);
