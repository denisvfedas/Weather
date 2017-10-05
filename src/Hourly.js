import React from 'react';
import Moment from 'react-moment';
//import moment from 'moment';
import 'moment-timezone';
import './Hourly.css';

function Hourly({data, timezone}) {
  let data12 = data.slice(0, 12);
  return(
    <div className="Hourly">
      <div className="Hourly-header">
        Hourly (12 hours)
      </div>
      <ul className="Hourly-list">
        {data12.map( (el) => {
          return(
            <li className="Hourly-list-el" key={el.time}>
              <Moment unix tz={timezone} format="h a">{el.time}</Moment>
              <div className="Hourly-list-el-temp">
                <img src={require(`./icons/${el.icon}-small.png`)} alt={el.icon}/>
                <h4>{Math.round(el.temperature)}°</h4>
                </div>
              <p>Feels like<br/> {Math.round(el.apparentTemperature)}°</p>
              <div className="Hourly-list-el-precip">
                <p>{Math.round(el.precipProbability * 100)}%</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Hourly;
//using moment
//<p>{moment.unix(data12[index].time).format("hh a")}</p>
