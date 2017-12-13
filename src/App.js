import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';

class App extends Component {
	constructor() {
		super();
		this.state={
			url: (window.location.href.substr(0, 5) === 'http:' ) ? 'http://localhost:3001/api' : 'https://machapi.herokuapp.com/api'
		}
	}

  render() {
    return (
      <div className="App">
        <HomePage url={this.state.url}/>
      </div>
    );
  }
}

export default App;
