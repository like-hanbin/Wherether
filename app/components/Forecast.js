import React, {Component} from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';


const {width,height} = Dimensions.get("window");

const WeatherGroup = {
    0: {
      title: '햇빛이 쨍쨍',
      icon: 'weather-sunny',
      colors:['#f5af19', '#f12711'],
    },
    2: {
      title: '번개 번쩍번쩍',
      icon: 'weather-lightning',
      colors:['#ffe11c', '#919191'],
    },
    3: {
      title: '비',
      icon: 'weather-rainy',
      colors:['#FFFFFF', '#6DD5FA', '#2980B9'],
    },
    5: {
      title: '소나기',
      icon: 'weather-pouring',
      colors:['#00c6fb', '#005bea'],
    },
    6: {
      title: '눈이 펑펑',
      icon: 'weather-snowy',
      colors:['#7DE2FC', '#B9B6E5'],
    },
    7: {
      title: '흐린 안개',
      icon: 'weather-fog',
      colors:['#BDC3C7', '#2C3E50'],
    },
    8: {
      title: '흐림',
      icon: 'weather-cloudy',
      colors:['#D7D2CC', '#304352'],
    }
  }

const Forecast = ({data}) => {

    const id = Math.floor(data.weather[0].id/100);
    const Weather = WeatherGroup[id];

    return (
        <LinearGradient colors={Weather.colors} style={styles.container}>
            <MaterialCommunityIcons name={Weather.icon} size={100} style={styles.icon}/>
            <Text style={styles.bigText}>
                {WeatherGroup[id].title}
            </Text>
            <Text style={styles.mainText}>
                {data.weather[0].description}
            </Text>
            <Text style={styles.bigText}>
                {Math.floor(data.main.temp-273.15)}ºC
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1,
      width: width,
      alignItems: 'center',
      justifyContent: 'center'
  },
  bigText: {
      fontSize: 20,
      textAlign: "center",
      fontWeight:'600',
      margin: 10,
  },
  mainText: {
      fontSize: 16,
      textAlign: "center",
  },
  icon: {
      
  }
});

export default Forecast;