import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "city": ""
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">WeatherApp</Link>
          <Search />
        </header>
        <main className="App-main">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
