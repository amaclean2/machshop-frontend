import React, { Component } from 'react';

class Endmill extends Component {

	render() {
		return (
			<svg height="100%" width="100%" viewBox="0 0 500 50" version="1.1" id="Endmill" xmlns="http://www.w3.org/2000/svg" >
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
		    
		    <path d="M 300 0 L 500 0 L 500 50 L 300 50 Z" fill={ this.props.fluteLength ? '#FC9' : '#89A' } />
		    <path d="M 480 0 q 15 0 20 10 L 500 0" fill={ this.props.radius ? '#FC9' : 'transparent' } />
		    <path d="M 480 50 q 15 0 20 -10 L 500 50" fill={ this.props.radius ? '#FC9' : 'transparent' } />
		    
		    <path d="M 250 0 c 40 0 50 50 100 50 L 400 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
		    <path d="M 300 0 c 40 0 50 50 100 50 L 450 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
		    <path d="M 350 0 c 40 0 50 50 100 50 L 500 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
		    <path d="M 400 0 c 40 0 50 50 100 50 L 550 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
		    <path d="M 450 0 c 40 0 50 50 100 50 L 600 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>

		    <path d="M 290 0 c 40 0 50 50 100 50 L 400 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
		    <path d="M 340 0 c 40 0 50 50 100 50 L 450 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
		    <path d="M 390 0 c 40 0 50 50 100 50 L 500 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
		    <path d="M 440 0 c 40 0 50 50 100 50 L 550 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
		    <path d="M 490 0 c 40 0 50 50 100 50 L 600 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>

		    <path d="M 0 0 L 300 0 L 300 50 L0 50" fill="#EEE" />
		    <path d="M 300 0 L 320 0 L 320 50 L 300 50" fill="#89A" />

		    <path d="M 0 0 L 500 0 L 500 50 L 0 50" fill={ this.props.toolLength ? '#FC9' : 'transparent' } />
		    <path d="M 150 5 L 290 5 L 290 45 L 150 45" fill={ this.props.undercut ? '#FC9' : 'transparent' } />
		    <path d="M 490 0 L 500 0 L 500 50 L 490 50" fill={ this.props.diameter ? '#FC9' : 'transparent' } />

		    <path d="M 0 20 L 500 20 L 500 30 L 0 30" fill="url(#shadow1)" />
		    <path d="M 0 30 L 500 30 L 500 50 L 0 50" fill="url(#shadow2)" />
		    <path d="M 0 50 L 500 50 L 500 50 L 0 50" fill="url(#shadow1)" />

		    <path d="M 150 0 L 290 0 L 290 5 L 150 5" fill={ this.props.undercut ? '#FFF' : 'transparent' } />
		    <path d="M 150 50 L 290 50 L 290 45 L 150 45" fill={ this.props.undercut ? '#FFF' : 'transparent' } />

		  </svg>);
	}
	
}

export default Endmill;