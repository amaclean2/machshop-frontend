import React, { Component } from 'react';

class Drill extends Component {

	render() {
		return (
			<svg height="100%" width="100%" viewBox="0 0 500 30" version="1.1" id="Endmill" xmlns="http://www.w3.org/2000/svg" >
        <defs>
          <linearGradient id="shadow1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ 'stopOpacity': 0 }} />
            <stop offset="100%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} /> 
          </linearGradient>
          <linearGradient id="shadow2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
            <stop offset="100%" style={{ 'stopOpacity': 0 }} /> 
          </linearGradient>
          <linearGradient id="shadow3" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
            <stop offset="100%" style={{ 'stopOpacity': 0 }} />  
          </linearGradient>
        </defs>
        
        <path d="M 0 0 L 300 0 L 300 30 L0 30" fill="#AAA" />
        <path d="M 250 0 L 500 0 L 500 30 L 250 30 Z" fill={ this.props.fluteLength ? '#FC9' : '#AAA' } />
        <path d="M 480 0 q 15 0 20 10 L 500 0" fill={ this.props.radius ? '#FC9' : 'transparent' } />
        <path d="M 480 50 q 15 0 20 -10 L 500 50" fill={ this.props.radius ? '#FC9' : 'transparent' } />
        
        <path d="M 250 0 c 40 0 50 30 100 30 L 400 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
        <path d="M 300 0 c 40 0 50 30 100 30 L 450 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
        <path d="M 350 0 c 40 0 50 30 100 30 L 500 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
        <path d="M 400 0 c 40 0 50 30 100 30 L 550 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
        <path d="M 450 0 c 40 0 50 30 100 30 L 600 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>

        <path d="M 290 0 c 40 0 50 30 100 30 L 400 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
        <path d="M 340 0 c 40 0 50 30 100 30 L 450 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
        <path d="M 390 0 c 40 0 50 30 100 30 L 500 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
        <path d="M 440 0 c 40 0 50 30 100 30 L 550 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
        <path d="M 490 0 c 40 0 50 30 100 30 L 600 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>

        <path d="M 0 0 L 500 0 L 500 30 L 0 30" fill={ this.props.toolLength ? '#FC9' : 'transparent' } />
        <path d="M 490 0 L 500 0 L 500 30 L 490 30" fill={ this.props.diameter ? '#FC9' : 'transparent' } />

        <path d="M 0 20 L 500 20 L 500 30 L 0 30" fill="url(#shadow1)" />
        <path d="M 0 30 L 500 30 L 500 30 L 0 30" fill="url(#shadow2)" />
        <path d="M 0 30 L 500 30 L 500 30 L 0 30" fill="url(#shadow1)" />
        <path d="M 490 0 L 500 0 L 500 15" fill="#FFF" />
        <path d="M 490 30 L 500 30 L 500 15" fill="#FFF" />

      </svg>);
	}
	
}

export default Drill;