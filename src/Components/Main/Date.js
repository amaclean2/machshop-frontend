import React, { Component } from 'react';
import calendarMonths from '../AppInformation/CalendarMonths';

class DateComp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: props.value,
			shown: false,
			monthArray: [],
			shownMonth: props.value,
			month: calendarMonths[new Date(props.value).getMonth()] + ' ' + new Date(props.value).getFullYear()
		}

		this.formatDate=this.formatDate.bind(this);
		this.toggleShown=this.toggleShown.bind(this);
		this.showCalendar=this.showCalendar.bind(this);
		this.calculateCalendar=this.calculateCalendar.bind(this);
		this.selectDate=this.selectDate.bind(this);
		this.monthBack=this.monthBack.bind(this);
		this.monthForward=this.monthForward.bind(this);
	}

	toggleShown() {
		this.setState({ shown: !this.state.shown });
	}

	formatDate() {
		let date = new Date(this.state.date),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			seconds = date.getSeconds(),
			dateString = '';

		if(this.props.time) {
			dateString = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
		} else {
			dateString = month + '-' + day + '-' + year;
		}

		return dateString;
	}

	calculateCalendar() {
		let month = [],
			week = [],
			today = new Date(this.state.shownMonth),
			lastDayLastMonth = new Date(today.setDate(0)),
			firstCalDay = new Date(this.state.shownMonth);

		firstCalDay.setDate(0);
		firstCalDay.setDate(lastDayLastMonth.getDate() - lastDayLastMonth.getDay());

		for (let j = 0; j < 6; j++) {
			for (let i = 0; i < 7; i++) {
				week.push(firstCalDay.getDate());
				firstCalDay.setDate(firstCalDay.getDate() + 1);
			}
			month.push(week);
			week = [];
		}

		this.setState({ monthArray: month });

	}

	componentWillMount() {
		this.calculateCalendar();
	}

	selectDate(e) {
		this.setState({ date: e.target.getAttribute('dateval')});
		this.toggleShown();
	}

	monthBack() {
		let current = new Date(this.state.shownMonth);
		current.setMonth(current.getMonth() - 1);
		this.setState({ shownMonth: current.getTime(), month: calendarMonths[current.getMonth()] + ' ' + current.getFullYear() }, () => {
			this.calculateCalendar();
		});
	}

	monthForward() {
		let current = new Date(this.state.shownMonth);
		current.setMonth(current.getMonth() + 1);
		this.setState({ shownMonth: current.getTime(), month: calendarMonths[current.getMonth()] + ' ' + current.getFullYear() }, () => {
			this.calculateCalendar();
		});
	}

	showCalendar() {

		let weeks = this.state.monthArray.map( (week, i) => {
			let days = week.map( (day) => {
				let dateVal = new Date(this.state.shownMonth),
					today = '';

				if(i < 1 && day > 7) {
					dateVal.setDate(0);
				}
				else if(i > 3 && day < 15) {
					dateVal.setMonth(dateVal.getMonth() + 1);
				}
				dateVal.setDate(day);

				if (dateVal.getDate() === new Date().getDate() &&
					dateVal.getMonth() === new Date().getMonth() &&
					dateVal.getFullYear() === new Date().getFullYear()) {
					today = 'today';
				}

				return <li key={day} className={"day-elem " + today} dateval={dateVal} onClick={this.selectDate}>{day}</li>;
			});
			return <li key={'w' + i} className="day-row">
				<ul>
					{days}
				</ul>
			</li>
		});
		let weeksArr = <ul>{weeks}</ul>;


		return <div className="calendar-box">
			<div className="cal-header">
				<i className="fa fa-chevron-left" onClick={this.monthBack} /> {this.state.month} <i className="fa fa-chevron-right" onClick={this.monthForward} />
			</div>
			<div className="cal-days">
				<span>S</span>
				<span>M</span>
				<span>T</span>
				<span>W</span>
				<span>T</span>
				<span>F</span>
				<span>S</span>
			</div>
			{weeksArr}
		</div>;
	}

	render() {
		let date = this.formatDate();
		let calSelector = this.showCalendar();
		return <div id="Main/Date" className="date-selection form-select">
			<div className={'screen-cover ' + ( !this.state.shown ? 'gone' : '')} onClick={this.toggleShown}></div>
			<div tabIndex="0" className="shown-box" onFocus={this.toggleShown}>
				{date}
			</div>
			<div className={'calendar ' + ( !this.state.shown ? 'gone' : '')}>
				{calSelector}
			</div>
		</div>
	}

}

export default DateComp;