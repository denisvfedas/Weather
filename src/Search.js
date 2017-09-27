import React from 'react';
import {browserHistory as history} from 'react-router';
import './Search.css';
import {Link} from 'react-router';


class Search extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     city: ""
  //   };
  // }

  _submitHandle = (event) => {
    event.preventDefault();
    history.push(`/${this.refs.cityInput.value}`);
    // this.setState({
    //   city: this.refs.cityInput.value
    // });
  }

  _handleClick = event => {
    this.refs.cityInput.value = '';
  }

  render() {
    //console.log("this.state.city", this.state.city);
    return(
      <div className="Search">
        <Link to="/" onClick={this._handleClick}>WeatherApp</Link>
        <form onSubmit={this._submitHandle}>
            <input type="text" ref="cityInput" className="Search-form-input"/>
            <button className="Search-form-button"><i className="fa fa-search"/></button>
        </form>
      </div>
    );
  }
}

export default Search;
