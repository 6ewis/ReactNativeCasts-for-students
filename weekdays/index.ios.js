import React, {Component} from 'react';
import {Text, AppRegistry, View, StyleSheet} from 'react-native';
import Moment from 'moment';
import DayItem from './src/day-item';


var styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', //default is column
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Weekdays extends Component {
   days() {
     return DAYS.map((item, index) => {
       return <DayItem day={item} key={index}/>;
      });
   }

   daysImproved() {
     //It's not really declarative - I personally dont like it
     var daysItems = [];

     for(var i = 0; i < 7; i++) {
       var day = Moment().add(i, 'days').format('dddd');
       daysItems.push(
         <DayItem day={day} key={i} daysUntil={i} />
       )
     }

     return daysItems;
   }

   render() {
     return <View style={styles.container}>
        {this.daysImproved()}
        </View>
   }
}

AppRegistry.registerComponent('weekdays', () => Weekdays);
