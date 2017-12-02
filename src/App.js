import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';

class App extends Component {
	constructor() {
		super();
		this.state={
			url: window.location.href
		}
		this.get=this.get.bind(this);
		this.post=this.post.bind(this);
		this.delete=this.delete.bind(this);
		this.setUrl=this.setUrl.bind(this);
	}

	setUrl() {
		var url = window.location.href;
  	var prefix = url.substring(0, 7);

  	prefix = (prefix === 'http://') ? 'http://localhost:3001' : 'https://machapi.herokuapp.com';
  	prefix = prefix.concat('/api');

  	this.setState({ url: prefix });
	}

	post() {
		let request = new Request(this.state.url + '/parts', {
			method: 'POST',
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify({
				user: 'Andrew',
				header: 'Header',
				body: 'Body'
			})
		});

		fetch(request).then( response => {
			return response.json();
		}).then( data => {
			console.log(data);
		})
	}

  get() {
  	let request = new Request(this.state.url + '/parts', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
    	return response.json();
    }).then( data => {
    	console.log(data);
    });
  }

  delete(partId) {
  	let request = new Request(this.state.url + '/parts/' + partId, {
  		method: 'DELETE',
  		headers: new Headers({ 'Content-Type': 'application/json' })
  	});

  	fetch(request).then( response => {
  		return response.json();
  	}).then( data => {
  		console.log(data);
  	})
  }

  componentWillMount() {
  	this.setUrl();
  }

  componentDidMount() {
  	console.log('url', this.state.url);
  	this.get();
  }



  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
