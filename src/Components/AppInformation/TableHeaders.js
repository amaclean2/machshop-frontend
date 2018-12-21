
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
				sortable: true,
				searchable: true
			},{
				title: 'Company Name',
				dataPoint: 'company_name',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Position',
				dataPoint: 'user_position',
				link: false,
				sortable: true,
				searchable: false
			},{
				title: 'Email',
				dataPoint: 'email',
				link: false,
				sortable: true,
				searchable: true
			}
		]
	},

	SetupSheets : {
		columns: [
			{
				title: 'Part Number',
				dataPoint: 'part_number',
				link: true,
				sortable: true,
				searchable: true
			},{
				title: 'Part Name',
				dataPoint: 'part_name',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Job Number',
				dataPoint: 'job_number',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Revision',
				dataPoint: 'revision',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Customer',
				dataPoint: 'customer',
				link: false,
				sortable: true,
				searchable: true
			}
		]
	},

	Companies : {
		columns: [
			{
				title: 'Name',
				dataPoint: 'name',
				link: true,
				sortable: false,
				searchable: true
			},{
				title: 'Id',
				dataPoint: '_id',
				link: false,
				sortable: false,
				searchable: true
			},{
				title: 'Location',
				dataPoint: 'street_address',
				link: false,
				sortable: false,
				searchable: true
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
				sortable: true,
				searchable: true
			},{
				title: 'Diameter',
				dataPoint: 'diameter',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'EDP Number',
				dataPoint: 'edp',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false,
				searchable: true
			},
			// {
			// 	title: 'Price per Tool',
			// 	dataPoint: 'price',
			// 	sortable: true,
			// 	searchable: true,
			// 	link: false,
			// 	formatted: (i) => {
			// 		return '$ ' + i;
			// 	}
			// },
			{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				searchable: true,
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
							month = a.getMonth() + 1,
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
				sortable: true,
				searchable: true
			},{
				title: 'Description',
				dataPoint: 'description',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false,
				// searchable: true
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth() + 1,
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
				sortable: true,
				searchable: true
			},{
				title: 'Description',
				dataPoint: 'description',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Location',
				dataPoint: 'location',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth() + 1,
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
				sortable: true,
				searchable: true
			},{
				title: 'Diameter',
				dataPoint: 'diameter',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Material',
				dataPoint: 'material',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'EDP Number',
				dataPoint: 'edp',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Price per Tool',
				dataPoint: 'price',
				sortable: true,
				link: false,
				searchable: true,
				formatted: (i) => {
					i = i ? i : '-';
					return '$ ' + i;
				}
			},{
				title: 'Quantity',
				dataPoint: 'count',
				sortable: true,
				link: false,
				searchable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth() + 1,
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
				sortable: true,
				searchable: true
			},{
				title: 'Description', 
				dataPoint: 'description',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Material', 
				dataPoint: 'material',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Price per Tool', 
				dataPoint: 'price',
				link: false,
				sortable: true,
				searchable: true,
				formatted: (i) => {
					i = i ? i : '-';
					return '$ ' + i;
				}
			},{
				title: 'Quantity', 
				dataPoint: 'count',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth() + 1,
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
				sortable: true,
				searchable: true
			},{
				title: 'Description', 
				dataPoint: 'description',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Price per Part', 
				dataPoint: 'price',
				link: false,
				sortable: true,
				searchable: true,
				formatted: (i) => {
					i = i ? i : '-';
					return '$ ' + i;
				}
			},{
				title: 'Quantity', 
				dataPoint: 'count',
				link: false,
				sortable: true,
				searchable: true
			},{
				title: 'Added',
				dataPoint: 'created_at',
				sortable: true,
				link: false,
				formatted: (i) => {
					if(i) {
						var a = new Date(i),
							year = a.getFullYear(),
							month = a.getMonth() + 1,
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