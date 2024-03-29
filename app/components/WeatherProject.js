import {View,Text,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import Forecast from './Forecast'
import { LinearGradient } from 'expo';

const API_KEY = 'e66dc77c071cebd201015bf765409636'

export default class WeatherProject extends React.Component {
    
    state = {
        isLoaded: false,
        forecast: null,
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude)
            },
            error => {
                this.setState({error: error})
            }
        )
    }

    _getWeather = (lat,long) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
            .then(Response => Response.json())
            .then(json =>{
                this.setState({
                    forecast: json,
                    isLoaded: true
                });
            })
    }

    _handleTextChange = (event) => {
        this.setState({zip: event.nativeEvent.text});
    }

    render() {
        content = null;
        isLoaded = this.state.isLoaded;

        if(this.state.forecast != null) {
            content = (
                <Forecast data={this.state.forecast}/>
            );
        }

        return (
            <View style={styles.container}>
            { 
                isLoaded ?  content : <ActivityIndicator color="#0000ff"/> 
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        width: 90
    },
    show: {
        fontSize: 10,
        backgroundColor: 'white'
    },
    hide: {
        fontSize: 50,
        backgroundColor: 'pink'
    }
})

