import React, { Component } from 'react';


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			queryText: '',
			data: this.props.data,
			headers: this.props.headers.columns
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

			let searchable, 
				fields, 
				tabledElements = [], 
				headerDataTypes = this.state.headers.map( header => header.dataPoint );

			this.props.searchable.forEach( item => {
				fields = row;
				searchable += fields[item].toLowerCase() + ' ';
			});

			if( searchable.indexOf(this.state.queryText) !== -1 ) {

				let rowContents = headerDataTypes.map( (field, i) => {

					if( this.state.headers[i].link) {
						return  (<td key={i} data-label={this.state.headers[i].title}>
									<a className='large-table-link' onClick={() => { this.props.toggleModal(row._id); }}>{fields[field]}</a>
									<span className='small-table-link'>{fields[field]}</span>
								</td>);
					} else {
						var value = this.state.headers[i].formatted ? this.state.headers[i].formatted(fields[field]) : fields[field];

						return	(<td key={i} data-label={this.state.headers[i].title}>{value}</td>);
					}
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
		let columnHeaders = this.state.headers.map( (head, i) => {
			if(head.sortable ) {
				return <th className={'clickable-headers'} onClick={() => this.filterByColumn(head.dataPoint)} key={i}>{head.title} </th>;
			} else {
				return <th key={i} >{head.title}</th>;
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
    			<div className={'search-bar ' + (this.props.noSearch ? 'gone' : '')}>
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
