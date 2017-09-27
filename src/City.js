import React from 'react';
import './City.css';

class City extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
    }
  }

  componentDidMount = () => {
    let name = this.props.params.city;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
    let forecastUrl = "https://api.darksky.net/forecast/0046ffbcf26d5b029c9499baa0c950b9/";//[lat],[lng]
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        city: name,
        location: data.results[0].geometry.location
      });
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;
      fetch(`${forecastUrl}${lat},${lng}`)
      .then(response => response.json())
      .then(forecast => {
        console.log("data", data);
        console.log("forecast", forecast);
      });
    });
  }

  componentDidUpdate = () => {
    if(this.state.city !== this.props.params.city) {
      let name = this.props.params.city;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          city: name,
          location: data.results[0].geometry.location
        });
      });
    }
  }

  render() {
    if(!this.state.location){
      return(
        <div>
          {this.state.city} Loading coordinates...
        </div>
      );
    } else {
      return(
        <div>
          {this.state.city} coordinates: {this.state.location.lat}, {this.state.location.lng}
        </div>
      );
    }
  }
}
export default City;
