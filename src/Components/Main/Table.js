import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import searchableFields from '../AppInformation/SearchableFields';


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnOrder: this.props.headers.map( head => { return head[1]; }),
			queryText: ''
		}
		this.columnNames=this.columnNames.bind(this);
		this.rows=this.rows.bind(this);
		this.updateQuery=this.updateQuery.bind(this);
	}

	rows() {
		let rows = this.props.data.map( (row, j) => {
			let searchable;
			let page = this.props.link.slice(0, -1);
			page = page.slice(1);
			for (var i = 0; i < searchableFields[page].length; i++) {
				searchable += row[searchableFields[page][i]] + ' ';
			}
			if( searchable.indexOf(this.state.queryText) !== -1 ) {
				// minis are individual arrays of each property in the row
				let minis = Object.entries(row), elements = [];
				for (var order of this.state.columnOrder) {
					for ( var mini of minis ) {
						if(mini[0] === order)
							elements.push(mini[1]);
					}
				}
				let rowContents = elements.map( (element, i) => {
					if(this.props.headers[i][2]) {
						return <td key={i}><NavLink to={this.props.link + row._id} >{element}</NavLink></td>
					}
					return <td key={i}>{element}</td>
				});
				return <tr key={j * 10}>{rowContents}</tr>
			} else {
				return null;
			}
		});
		return rows;
	}

	updateQuery(e) {
		this.setState({ queryText: e.target.value });
	}

	columnNames() {
		let columnHeaders = this.props.headers.map( (head, i) => {
			return <th key={i} >{head[0]}</th>
		});

		return columnHeaders;
	}

  render() {
  	let columnNames = this.columnNames();
  	let rows = this.rows();
    return (
    	<div>
    		<div className="table-top">
    			<NavLink to={this.props.link + '0'} className='button table-button'>Add</NavLink>
    			<div className="search-bar">
    				<input type="text" placeholder='Search' onChange={this.updateQuery} />
    			</div>
    		</div>
	  		<table className="important-table">
	  			<thead>
	  				<tr>
	  					{columnNames}
	  				</tr>
	  			</thead>
	  			<tbody>
	  				{rows}
	  			</tbody>
	  		</table>
  		</div>);
}
}

export default Table;
