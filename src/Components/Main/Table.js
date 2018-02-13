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
		let page = this.props.link.replace(/\//g, ''),
			data;

		if(page.indexOf('tool') !== -1) {
			page = page.replace('tool', '');
			data = this.props.data.map( item => {
				item.tool_data._id = item._id;
				return item.tool_data;
			})
		} else {
			data = this.props.data;
		}

		let rows = data.map( (row, j) => {
			let searchable
			
			for (var i = 0; i < searchableFields[page].length; i++) {
				searchable += row[searchableFields[page][i]].toLowerCase() + ' ';
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
						return <td key={i} data-label={this.props.headers[i][0]}><NavLink to={this.props.link + row._id} >{element}</NavLink></td>
					}
					return <td key={i} data-label={this.props.headers[i][0]}>{element}</td>
				});
				return <tr key={j * 10}>{rowContents}</tr>
			} else {
				return null;
			}
		});
		return rows;
	}

	updateQuery(e) {
		this.setState({ queryText: e.target.value.toLowerCase() });
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
    			<div className={this.props.noAdd ? 'gone' : ''}>
    				<NavLink to={this.props.link + '0'} className='button table-button'>Add</NavLink>
    			</div>
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
