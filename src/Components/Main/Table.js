import React, { Component } from 'react';


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnOrder: this.props.headers.map( head => { return head[1]; }),
			queryText: '',
			data: this.props.data
		}
		this.columnNames=this.columnNames.bind(this);
		this.rows=this.rows.bind(this);
		this.updateQuery=this.updateQuery.bind(this);
		this.filterByColumn=this.filterByColumn.bind(this);

	}

	filterByColumn(columnName) {
		let data = this.props.data;
		data = data.sort( (a, b) => {
			if(a.tool_data) {
				if(a.tool_data[columnName] < b.tool_data[columnName]) return -1;
				if(a.tool_data[columnName] > b.tool_data[columnName]) return 1;
				return 0;
			} else {
				if(a[columnName] < b[columnName]) return -1;
				if(a[columnName] > b[columnName]) return 1;
				return 0;
			}	
		});
		
		this.setState({ data: data });
	}

	rows() {

		let data = this.state.data;
		let rows = data.map( (row, j) => {
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
					if(this.props.headers[i][2] === 'e') {
						return <td key={i} data-label={this.props.headers[i][0]}>
											<a className='large-table-link' onClick={() => { this.props.toggleModal(row._id); }}>{element}</a>
											<span className='small-table-link' >{element}</span>
										</td>
					}
					return <td key={i} data-label={this.props.headers[i][0]}><span className={'dollar ' + (this.props.headers[i][1] === 'price' ? '' : 'gone')}>$</span>{element}</td>
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
			if(head.indexOf('sortable') !== -1) {
				return <th className={'clickable-headers'} onClick={() => this.filterByColumn(head[1])} key={i}>{head[0]} </th>;
			} else {
				return <th key={i} >{head[0]}</th>;
			}
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
    				<button onClick={() => {this.props.toggleModal('0')}} className='button table-button'>{this.props.addText ? this.props.addText : 'add'}</button>
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
