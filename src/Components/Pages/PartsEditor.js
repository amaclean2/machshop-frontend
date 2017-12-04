import React, { Component } from 'react';

class PartsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
      partId: this.props.match.params.partId
    }
    this.setUrl=this.setUrl.bind(this);
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
  }

  setUrl() {
    var url = window.location.href;
    var prefix = url.substring(0, 7);

    prefix = (prefix === 'http://') ? 'http://localhost:3001' : 'https://machapi.herokuapp.com';
    prefix = prefix.concat('/api');

    this.setState({ url: prefix });
  }

  get() {
    let request = new Request(this.state.url + '/parts/' + this.state.partId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    })
  }

  post() {
    let request = new Request(this.state.url + '/parts', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        part_number: '12345',
        part_revision: 'A',
        part_name: 'Link',
        customer: 'Andrew'
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    });
  }

  put() {
    let request = new Request(this.state.url + '/parts/' + this.state.partId, {
      method: 'PUT',
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
    });
  }

  componentWillMount() {
    this.setUrl();
  }

  componentDidMount() {
    this.get();
  }

  render() {
    return (
      <div>
        Editor
      </div>
    );
  }
}

export default PartsEditor;
