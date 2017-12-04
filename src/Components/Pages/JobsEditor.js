import React, { Component } from 'react';

class JobsEditor extends Component {
  constructor() {
    super()
    this.state = {
      url: window.location.href
    }
    this.setUrl=this.setUrl.bind(this);
  }

  setUrl() {
    var url = window.location.href;
    var prefix = url.substring(0, 7);

    prefix = (prefix === 'http://') ? 'http://localhost:3001' : 'https://machapi.herokuapp.com';
    prefix = prefix.concat('/api');

    this.setState({ url: prefix });
  }

  componentWillMount() {
    this.setUrl();
  }

  render() {
    console.log('this', this.state);
    return (
      <div>
        Editor
      </div>
    );
  }
}

export default JobsEditor;
