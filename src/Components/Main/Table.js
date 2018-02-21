import React, { Component } from 'react';


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
		let data = this.props.data,
			rows = data.map( (row, j) => {
			let searchable, fields;

			for (var i = 0; i < this.props.searchable.length; i++) {
				fields = row.tool_data ? row.tool_data : row;
				searchable += fields[this.props.searchable[i]].toLowerCase() + ' ';
			}

			if( searchable.indexOf(this.state.queryText) !== -1 ) {

				// minis are individual arrays of each property in the row
				let minis = Object.entries(fields), elements = [];

				for (var order of this.state.columnOrder) {
					for ( var mini of minis ) {
						if(mini[0] === order)
							elements.push(mini[1]);
					}
				}

				let rowContents = elements.map( (element, i) => {
					if(this.props.headers[i][2]) {
						return <td key={i} data-label={this.props.headers[i][0]}>
											<a className='large-table-link' onClick={() => { this.props.toggleModal(row._id); }}>{element}</a>
											<span className='small-table-link' >{element}</span>
										</td>
					}
					return <td key={i} data-label={this.props.headers[i][0]}>{element}</td>
				});
				return <tr key={j * 10} >
								{rowContents}
								<td className='small-row-link' onClick={() => { this.props.toggleModal(row._id); }}></td>
							</tr>
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
    				<button onClick={() => {this.props.toggleModal('0')}} className='button table-button'>Add</button>
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
