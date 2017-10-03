import React from 'react';
import './City.css';

class City extends React.Component {
  constructor() {
    super();
    this.state = {
      unit: "ca"
      // city: "Montreal",
      // location: {
      //   lat: 45.5016889,
      //   lng: -73.567256
      // },
      // forecast: {
      //   currently: {
      //     temperature: 87.27
      //   }
    }
  }

  componentDidMount = () => {
    let unit = this.state.unit;
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
    if(this.state.city !== this.props.params.city) {
      let unit = this.state.unit;
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
            <h2>{this.state.city}</h2>
            <p>{this.state.forecast.hourly.summary}</p>
          </div>
          <div className="City-loaded-temp">
            <img src="clear-night.jpg" alt="clear-night" height="62" width="62"/>
            <h2>{this.state.forecast.currently.temperature}</h2>
            <p>Feels like {this.state.forecast.currently.apparentTemperature}</p>
          </div>
          <h2>{this.state.forecast.currently.summary}</h2>
        </div>
      );
    }
  }
}
export default City;
