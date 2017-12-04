import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnOrder: this.props.headers.map( head => { return head[1]; })
		}
		this.columnNames=this.columnNames.bind(this);
		this.rows=this.rows.bind(this);
	}

	rows() {
		let rows = this.props.data.map( (row, j) => {
			let minis = Object.entries(row), elements = [];
			for (var order of this.state.columnOrder) {
				for ( var mini of minis ) {
					if(mini[0] === order)
						elements.push(mini[1]);
				}
			}
			let rowContents = elements.map( (element, i) => {
				if(this.props.headers[i][2]) {
					return <td key={i}><NavLink to={'/parts/' + row._id} >{element}</NavLink></td>
				}
				return <td key={i}>{element}</td>
			});
			return <tr key={j * 10}>{rowContents}</tr>
		});
		return rows;
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
    		<NavLink to={'/parts/0'} className='button table-button'>Add</NavLink>
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
