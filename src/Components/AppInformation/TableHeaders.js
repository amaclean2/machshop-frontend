
// attributes with an 'e' are editable in the table
// format is the name that will appear on the header, then the name from the api, then editable or not

let headers = {
	Parts : [
		['Part Number', 'part_number', 'e'],
		['Revision', 'part_revision'], 
		['Part Name', 'part_name'], 
		['Customer', 'customer']
	],

	Users : {
		columns: [
			{
				title: 'Name',
				dataPoint: 'name',
				link: true,
				sortable: false
			},{
				title: 'Company Name',
				dataPoint: 'company_name',
				link: false,
				sortable: false
			},{
				title: 'Email',
				dataPoint: 'email',
				link: false,
				sortable: false
			}
		]
	},

	Companies : {
		columns: [
			{
				title: 'Name',
				dataPoint: 'name',
				link: true,
				sortable: false
			},{
				title: 'Id',
				dataPoint: '_id',
				link: false,
				sortable: false
			},{
				title: 'Location',
				dataPoint: 'street_address',
				link: false,
				sortable: false
			}
		]
	},

	UsersWidget : [
		['Name', 'name', 'e'], 
		['Hours', 'hours']
	],
	MiniJobs : [
		['Job Number', 'job_number', 'e'], 
		['Start Date', 'date_to_start']
	],
	Jobs  : [
		['Job Number', 'job_number', 'e'], 
		['Part Number', 'part_number'], 
		['Description', 'description'], 
		['Date to Start', 'date_to_start'], 
		['Date Started', 'date_started']
	],
	JobsWidget : [
		['Job Number', 'job_number', 'e'], 
		['Part Number', 'part_number'], 
		['Due Date', 'date_to_start']
	],

	MillTools : {
		columns: [
			{ 
				title: 'Type',
				dataPoint: 'tool_type',
				link: true,
				sortable: true
			},{
				title: 'Diameter',
				dataPoint: 'diameter',
				sortable: true,
				link: false
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false
			},{
				title: 'EDP Number',
				dataPoint: 'edp',
				sortable: true,
				link: false
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false
			},{
				title: 'Price per Tool',
				dataPoint: 'price',
				sortable: true,
				link: false,
				formatted: (i) => {
					return '$ ' + i;
				}
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	},

	LatheTools : {
		columns: [
			{ 
				title: 'Type',
				dataPoint: 'tool_type',
				link: true,
				sortable: true
			},{
				title: 'Description',
				dataPoint: 'description',
				sortable: true,
				link: false
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false
			},{
				title: 'Price per Tool',
				dataPoint: 'price',
				sortable: true,
				link: false,
				formatted: (i) => {
					return '$ ' + i;
				}
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	},

	OtherTools : {
		columns: [
			{ 
				title: 'Name',
				dataPoint: 'name',
				link: true,
				sortable: true
			},{
				title: 'Description',
				dataPoint: 'description',
				sortable: true,
				link: false
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false
			},{
				title: 'Price per Part',
				dataPoint: 'price',
				sortable: true,
				link: false,
				formatted: (i) => {
					return '$ ' + i;
				}
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	},

	OrderMill : {
		columns: [
			{ 
				title: 'Type',
				dataPoint: 'tool_type',
				link: true,
				sortable: true
			},{
				title: 'Diameter',
				dataPoint: 'diameter',
				sortable: true,
				link: false
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false
			},{
				title: 'EDP Number',
				dataPoint: 'edp',
				sortable: true,
				link: false
			},{
				title: 'Price per Tool',
				dataPoint: 'price',
				sortable: true,
				link: false,
				formatted: (i) => {
					return '$ ' + i;
				}
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	},

	OrderLathe: {
		columns: [
			{
				title: 'Type',
				dataPoint: 'tool_type',
				link: true,
				sortable: true
			},{
				title: 'Description', 
				dataPoint: 'description',
				link: false,
				sortable: true
			},{
				title: 'Material', 
				dataPoint: 'material',
				link: false,
				sortable: true
			},{
				title: 'Price per Tool', 
				dataPoint: 'price',
				link: false,
				sortable: true
			},{
				title: 'Quantity', 
				dataPoint: 'count',
				link: false,
				sortable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	},

	OrderOther: {
		columns: [
			{
				title: 'Name',
				dataPoint: 'name',
				link: true,
				sortable: true
			},{
				title: 'Description', 
				dataPoint: 'description',
				link: false,
				sortable: true
			},{
				title: 'Location', 
				dataPoint: 'location',
				link: false,
				sortable: true
			},{
				title: 'Price per Part', 
				dataPoint: 'price',
				link: false,
				sortable: true
			},{
				title: 'Quantity', 
				dataPoint: 'count',
				link: false,
				sortable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth(),
							day = a.getDate();

						return month + '-' + day + '-' + year;
					} else {
						return '-';
					}
				}
			}
		]
	}
};

export default headers;