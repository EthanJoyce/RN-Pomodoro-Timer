import * as React from 'react';
import { Text, Button, TimePickerAndroid, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';


export default class Counter extends React.Component {

  constructor(props) {
    super(props)

    this.navigation = props.navigation

    if (global.previousCounterState !== undefined) {
      this.state = global.previousCounterState // Return old state. Note: having multiple instances of Counter will break this
    } else {
      this.state = {
        count: global.WORK_TIME * 60,
        isFreeTime: false,
        isTimerRunning: true,
      }
    }
  }

  render() {
    return (
      <View>
        <View style={this.styles.settings_button}>
          <Button
            title='Settings'
            color='#888'
            onPress={() => this.navigation.navigate('Settings')}
          />
        </View>
        <Card>
          <View style={this.styles.controls_container}>
            <this.CountdownButton
              title="Swap"
              onPress={() => this.swapTime()}
            />
          </View>
          <StatusDisplay
            styleWorking={this.styles.status_display_working}
            styleFreetime={this.styles.status_display_freetime}
            isFreeTime={this.state.isFreeTime}
          />
          <Text style={this.styles.counter_text}>
            {this.formatSecondsToTime(this.state.count)}
          </Text>
          <View style={this.styles.controls_container}>
            <this.CountdownButton
              title={this.state.isTimerRunning ? ("Pause") : ("Unpause")}
              onPress={() => this.togglePauseTimer()}
            />
            <this.CountdownButton
              title="Reset"
              onPress={() => this.resetTimer()}
              color="#F44336"
            />
          </View>
        </Card>
      </View>
    )
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()

    global.previousCounterState = this.state // Save state on dismount
  }

  startTimer() {
    this.counterId = setInterval(
      () => {
        if (this.state.count > 0) {
          this.setState({
            count: this.state.count - 1
          })
        } else {
          this.swapTime()
        }
      },
      1000
    )

    this.setState({
      isTimerRunning: true,
    })
  }

  stopTimer() {
    clearInterval(this.counterId)
    this.counterId = undefined

    this.setState({
      isTimerRunning: false,
    })
  }

  swapTime() {
    this.stopTimer();

    this.setState({
      isFreeTime: !this.state.isFreeTime,
      count: !this.state.isFreeTime ? global.FREE_TIME * 60 : global.WORK_TIME * 60, // Remember, !isFreeTime is the NEW value
    })
    
    this.startTimer()
  }

  togglePauseTimer() {
    if (this.isTimerRunning()) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  resetTimer() {
    this.setState({
      count: this.state.isFreeTime ? global.FREE_TIME * 60 : global.WORK_TIME * 60,
    })
  }

  formatSecondsToTime = secNum => {
    hours = Math.floor(secNum / 3600)
    minutes = Math.floor((secNum - hours * 3600) / 60)
    seconds = Math.floor(secNum - minutes * 60 - hours * 3600)

    if (hours   < 10) { hours   = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    return hours + ':' + minutes + ':' + seconds
  }

  isTimerRunning() {
    return this.counterId != undefined
  }

  CountdownButton = props => {
    return (
      <View style={this.styles.controls}>
        <Button
          title={props.title}
          onPress={props.onPress}
          color={props.color}
        />
      </View>
    )
  }

  styles = StyleSheet.create({
    settings_button: {
      marginTop: Constants.statusBarHeight,
    },
    counter_text: {
      margin: 24,
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    controls_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 12,
    },
    controls: {
      flex: 1,
      margin: 4,
    },
    control_text: {
      margin: 8,
    },
    status_display_working: {
      margin: 12,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#F44336',
      textAlign: 'center',
    },
    status_display_freetime: {
      margin: 12,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#7CFC00',
      textAlign: 'center',
    },
  })
}

function StatusDisplay(props) {
  const isFreeTime = props.isFreeTime

  if(isFreeTime) {
    return (<Text style={props.styleFreetime}>Free Time!</Text>)
  } else {
    return (<Text style={props.styleWorking}>Working</Text>)
  }
}
