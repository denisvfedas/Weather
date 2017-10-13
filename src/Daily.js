import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import './Daily.css';

class Daily extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="Daily">
        <div className="Daily-header">
          Dily (7 days)
        </div>
        <ul className="Daily-list">
          {this.props.dailyData.slice(1).map(day => {
            return(
              <li className="Daily-list-day" key={day.time}>
                <Moment unix tz={this.props.timezone} format="ddd">{day.time}</Moment>
                <Moment unix tz={this.props.timezone} format="MMM DD">{day.time}</Moment>
                <div className="Daily-list-day-temp">
                  <img src={require(`./icons/${day.icon}-small.png`)} alt={day.icon}/>
                  <h4>{Math.round(day.temperatureHigh)}°</h4>
                </div>
                <p>Low {Math.round(day.temperatureLow)}</p>
                <div className="Daily-list-day-precip">
                  <img src={require("./icons/rain-cloud.png")} alt="rain"/>
                  <p>{Math.round(day.precipProbability * 100)}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Daily;
