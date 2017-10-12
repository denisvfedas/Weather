import React, {Component} from 'react';
import Moment from 'react-moment';
//import moment from 'moment';
import 'moment-timezone';
import './Hourly.css';

class Hourly extends Component {
  constructor(props){
    super(props)
    this.state = {
      length: 12,
      firstIndex: 0
    }
  }

  _handleClickFwd = () => {
    this.setState({
      firstIndex: this.state.firstIndex + 1
    })
  };

  _handleClickBkw = () => {
    this.setState({
      firstIndex: this.state.firstIndex - 1
    })
  };

  renderBtnBkw(arr) {
    if(this.state.firstIndex > 0 || arr.length < this.state.lenght ) {
      return(
        <button className="Hourly-header-backward-btn" onClick={() => this._handleClickBkw()}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
      );
    }
  }

  renderBtnFwd() {
    if(this.state.firstIndex < this.state.length - 1) {
      return(
        <button className="Hourly-header-forward-btn" onClick={() =>this._handleClickFwd()}>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      );
    }
  }

  render() {
    let newData = this.props.hourlyData.slice(this.state.firstIndex, this.state.length);
    return(
      <div className="Hourly">
        <div className="Hourly-header">
          Hourly (12 hours)
          <div className="Hourly-header-btns-contr">
            {this.renderBtnBkw(newData)}
            {this.renderBtnFwd()}
          </div>
        </div>
        <ul className="Hourly-list">
          {newData.map( (el) => {
            return(
              <li className="Hourly-list-el" key={el.time}>
                <Moment unix tz={this.props.timezone} format="h a">{el.time}</Moment>
                <div className="Hourly-list-el-temp">
                  <img src={require(`./icons/${el.icon}-small.png`)} alt={el.icon}/>
                  <h4>{Math.round(el.temperature)}°</h4>
                  </div>
                <p>Feels like<br/> {Math.round(el.apparentTemperature)}°</p>
                <div className="Hourly-list-el-precip">
                  <img src={require("./icons/rain-cloud.png")} alt="rain"/>
                  <p>{Math.round(el.precipProbability * 100)}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Hourly;
//using moment
//<p>{moment.unix(data12[index].time).format("hh a")}</p>
