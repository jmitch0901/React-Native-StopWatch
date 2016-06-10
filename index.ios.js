
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MSM from 'minutes-seconds-milliseconds';

class StopWatch extends Component{

  constructor(props){
    super(props);

    this.state = { startTime: MSM(0), timeElapsed:MSM(0), running:false, laps:[] };
  }

  _onStartPress(){

    if(this.state.running){
      clearInterval(this.interval);
      return this.setState({running:false});
    }

    this.setState({running:true});

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({ timeElapsed: new Date() - this.state.startTime });
    },30);

  }

  _startStopButton(){

    const runningStyle = this.state.running ? styles.stopButton : styles.startButton;

    return (
      <TouchableHighlight
          underlayColor="gray"
          onPress={this._onStartPress.bind(this)}
          style={[styles.button,runningStyle]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }

  _onLapPress(){
    this.setState({
      startTime: new Date(),
      timeElapsed: MSM(0),
      laps:[...this.state.laps,this.state.timeElapsed]
    });
  }

  _lapButton(){
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this._onLapPress.bind(this)}
        style={[styles.button]}
        >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  }

  _border(color){
    return {
      // borderColor: color,
      // borderWidth:4
    };
  }

  _renderLaps(){
    return this.state.laps.map((lap,index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>Lap #{index+1}</Text>
          <Text style={styles.lapText}>{ MSM(lap) }</Text>
        </View>
      );
    });
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={[styles.header,this._border('yellow')]}>
          <View style={[styles.timerWrapper,this._border('red')]}>
            <Text style={styles.timer}>{ MSM(this.state.timeElapsed) }</Text>
          </View>
          <View style={[styles.buttonWrapper,this._border('green')]}>
            { this._startStopButton() }
            { this._lapButton() }
          </View>
        </View>

        <View style={[styles.footer, this._border('blue')]}>
          {this._renderLaps()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{ //whole screen
    flex:1,
    alignItems: 'stretch'
  },
  header:{ //yellow
    flex:1
  },
  footer:{ //blue
    flex:1
  },
  timerWrapper:{
    flex:5,
    alignItems:'center',
    justifyContent: 'center'
  },
  buttonWrapper:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  timer:{
    fontSize:60
  },
  button:{
    borderWidth: 2,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor:'green'
  },
  stopButton: {
    borderColor: 'red'
  },
  lap: {
    justifyContent:'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize:30
  }

});

AppRegistry.registerComponent('StopWatch', () => StopWatch);
