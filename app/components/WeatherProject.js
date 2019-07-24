import {View,Text,StyleSheet,TextInput} from 'react-native'
import React from 'react'
import Forecast from './Forecast'

const API_KEY = 'e66dc77c071cebd201015bf765409636'

export default class WeatherProject extends React.Component {
    
    state = {
        isLoaded: false,
        forecast: null,
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude).then(()=>{
                    this.setState({isLoaded: true});
                });
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
                ResponseJSON = {
                    main: json.weather[0].main,
                    description: json.weather[0].description,
                    temp: json.main.temp
                };
                this.setState({forecast: ResponseJSON})
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
                <Forecast
                    main={this.state.forecast.main}
                    description={this.state.forecast.description}
                    temp={Math.floor(this.state.forecast.temp - 273.150)}
                />
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={content? styles.hide : styles.show}>ㅋㅋㅋㅋㅋㅋㅋㅋ</Text>
                </View>
                {content}
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

