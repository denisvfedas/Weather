import React, { Component } from 'react';
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
