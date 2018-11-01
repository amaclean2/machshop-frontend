import React, { Component } from 'react';

class LoadingBlock extends Component {

  render() {
    return (
      <div className="loading-block" id="Main/LoadingBlock">
        <div className="loading-message">{this.props.loadingMessage}</div>
        <div className="loading-bar-container">
          <div className="loading-bar-movement slide-across"></div>
        </div>
      </div>
    );
  }
}

export default LoadingBlock;
