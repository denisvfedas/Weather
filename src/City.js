import React from 'react';
import UnitBtn from './UnitBtn';
import Map from './Map';
import Menu from './Menu';
import './City.css';

class City extends React.Component {
  constructor() {
    super();
    this.state = {
      unit: true
    }
  }
  //changes units
  _handleClickUnitBtn = () => {
    this.setState({
      unit: !this.state.unit
    })
  }
  //fetchs the data from Google geocoding and DarkSky
  componentDidMount = () => {
    //verify which unit to use
    let unit;
    if (this.state.unit) {
      unit = "ca" ;
    } else {
      unit = "us";
    };
    //take the name of the location from address string
    let name = this.props.params.city;
    //google geocode
    let cityUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
    //Proxy server https://cors-anywhere.herokuapp.com/ to prevent CORS problems
    let forecastUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0046ffbcf26d5b029c9499baa0c950b9/";//[lat],[lng]
    fetch(cityUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data.results[0].formatted_address);//formatted name of the city
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
  //updates the result if location or units has been changed
  componentDidUpdate = () => {
    //veirfys units
    let unit;
    if (this.state.unit) {
      unit = "ca" ;
    } else {
      unit = "us";
    };
    //verifys whether city or units has been changed
    if(this.state.city !== this.props.params.city || unit !== this.state.forecast.flags.units) {
      let name = this.props.params.city;
      let cityUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCbsNCa4SMcWhL10v9oYWNHnXC1dRWNnT4`;
      let forecastUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0046ffbcf26d5b029c9499baa0c950b9/";//[lat],[lng]
      fetch(cityUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.results[0].formatted_address);
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
      var children = React.Children.map(this.props.children, child => {
        return (
          React.cloneElement(child, {
              hourlyData: this.state.forecast.hourly.data,
              timezone: this.state.forecast.timezone,
              dailyData: this.state.forecast.daily.data
            })
        );
      });
      return(
        <div className="City-loaded">
          <div className="City-loaded-city">
            <Menu city={this.props.params}/>
            <div className="City-loaded-city-title">
              <h1>{this.state.city}</h1>
              <UnitBtn handleClick={this._handleClickUnitBtn} unit={this.state.unit}/>
            </div>
            <button className="City-loaded-city-list-btn">
              <i className="fa fa-list-ul fa-2x" aria-hidden="true"/>
            </button>
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
          {/*<Hourly data={this.state.forecast.hourly.data} timezone={this.state.forecast.timezone}/>*/}
          {/*<Daily data={this.state.forecast.daily.data}/>*/}
          {children}
          <Map location={this.state.location}/>
        </div>
      );
    }
  }
}
export default City;
