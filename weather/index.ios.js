import React, {Component} from 'react';
import {App, Text, MapView, View, StyleSheet, AppRegistry} from 'react-native';
import Api from './src/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30 
  }
});


class Weather extends Component {
  constructor() {
    super();
    this.state = {
      pin: {
       latitude: 0,
       longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  render() {
     return <View style={styles.container}>
       <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        style={styles.map}>
      </MapView>
      <View style={styles.textWrapper}>
        {this.showInformations()}
      </View>
    </View>
  }

  showInformations() {
    const {city, temperature, description} = this.state;
    return [city, temperature, description].map(
           (item, index) => {
             console.log(item);
             return <Text style={styles.text} key={index}>
               { this.capitalizeFirstLetter(item) }
             </Text>}
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onRegionChangeComplete({longitude, latitude}) {
     this.setState({
       pin: {
         longitude: longitude,
         latitude: latitude
       }
     });

     Api(latitude, longitude)
       .then(data => this.setState(data))
       .catch(error => console.log("An error occured", error));
  }
}

AppRegistry.registerComponent('weather', () => Weather);
