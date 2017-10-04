import React from 'react';
import UnitBtn from './UnitBtn';
import './City.css';

class City extends React.Component {
  constructor() {
    super();
    this.state = {
      unit: true
    }
  }

  _handleClick = () => {
    this.setState({
      unit: !this.state.unit
    })
  }

  componentDidMount = () => {
    let unit;
    if (this.state.unit) {
      unit = "ca" ;
    } else {
      unit = "us";
    };
    let name = this.props.params.city;
    let cityUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
    //Proxy server https://cors-anywhere.herokuapp.com/ to prevent CORS problems
    let forecastUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0046ffbcf26d5b029c9499baa0c950b9/";//[lat],[lng]
    fetch(cityUrl)
    .then(response => response.json())
    .then(data => {
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;
      fetch(`${forecastUrl}${lat},${lng}?units=${unit}`)
      .then(response => response.json())
      .then(forecast => {
        console.log("forecast DidMount", forecast);
        this.setState({
          city: name,
          location: data.results[0].geometry.location,
          forecast: forecast
        });
      });
    });
  }

  componentDidUpdate = () => {
    let unit;
    if (this.state.unit) {
      unit = "ca" ;
    } else {
      unit = "us";
    };
    if(this.state.city !== this.props.params.city || unit !== this.state.forecast.flags.units) {
      let name = this.props.params.city;
      let cityUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
      let forecastUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0046ffbcf26d5b029c9499baa0c950b9/";//[lat],[lng]
      fetch(cityUrl)
      .then(response => response.json())
      .then(data => {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        fetch(`${forecastUrl}${lat},${lng}?units=${unit}`)
        .then(response => response.json())
        .then(forecast => {
          console.log("forecast DidUpdate", forecast);
          this.setState({
            city: name,
            location: data.results[0].geometry.location,
            forecast: forecast
          });
        });
      });
    }
  }

  render() {
    if(!this.state.forecast){
      return(
        <div className="City-empty">
          Loading data...
        </div>
      );
    } else {
      return(
        <div className="City-loaded">
          <div className="City-loaded-city">
            <h1>{this.state.city}</h1>
            <UnitBtn handleClick={this._handleClick} unit={this.state.unit}/>
          </div>
          <p>{this.state.forecast.hourly.summary}</p>
          <div className="City-loaded-temp">
            <img src={require(`./icons/${this.state.forecast.currently.icon}.png`)} alt={`${this.state.forecast.currently.icon}`} />
            <h1>
              {Math.round(this.state.forecast.currently.temperature)}
            </h1>
            <div className="City-loaded-temp-cont">
              <h2>{this.state.unit ? "°C" : "°F"}</h2>
              <p>Feels like<br/>
                {Math.round(this.state.forecast.currently.apparentTemperature)}
              </p>
            </div>
          </div>
          <h2>{this.state.forecast.currently.summary}</h2>
        </div>
      );
    }
  }
}
export default City;
