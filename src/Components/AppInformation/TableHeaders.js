
// attributes with an 'e' are editable in the table
// format is the name that will appear on the header, then the name from the api, then editable or not

let headers = {
	Parts : [
		['Part Number', 'part_number', 'e'],
		['Revision', 'part_revision'], 
		['Part Name', 'part_name'], 
		['Customer', 'customer']
	],
	Users : [
		['Name', 'name', 'e'], 
		['Company Name', 'company_name'], 
		['Email', 'email']
	],
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
	Companies : [
		['Name', 'name', 'e'], 
		['Id', '_id'], 
		['Location', 'street_address']
	],
	MillTools : [
		['Type', 'tool_type', 'e'],
		['Diameter','diameter'],
		['Material', 'material'], 
		['EDP Number', 'edp']
		// ['Job Number', 'job_number']
	],
	OrderMill : [
		['Type', 'tool_type', 'e'],
		['Diameter','diameter'],
		['Material', 'material'], 
		['EDP Number', 'edp'],
		['Price per Tool', 'price'],
		['Quantity', 'count']
		// ['Job Number', 'job_number']
	],
	LatheTools : [
		['Type', 'tool_type', 'e'],
		['Description','description'],
		['Material', 'material']
		// ['Part Number', 'part_number']
	],
	OrderLathe : [
		['Type', 'tool_type', 'e'],
		['Description', 'description'],
		['Material', 'material'],
		['Price per Tool', 'price'],
		['Quantity', 'count']

	],
	OtherTools : [
		['Name', 'name', 'e'],
		['Description','description']
		// ['Part Number', 'part_number']
	],
	OrderOther : [
		['Name', 'name', 'e'],
		['Description','description'],
		['Price per Part', 'price'],
		['Quantity', 'count']
		// ['Part Number', 'part_number']
	],
};

export default headers;