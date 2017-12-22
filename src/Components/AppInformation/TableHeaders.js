let headers = {
	Parts : [['Part Number', 'part_number', 'e'], ['Revision', 'part_revision'], ['Part Name', 'part_name'], ['Customer', 'customer']],
	Users : [['Name', 'name', 'e'], ['Company Name', 'company_name'], ['Email', 'email']],
	MiniJobs : [['Job Number', 'job_number', 'e'], ['Start Date', 'date_to_start']],
	Jobs  : [['Job Number', 'job_number', 'e'], ['Part Number', 'part_number'], ['Description', 'description'], ['Date to Start', 'date_to_start'], ['Date Started', 'date_started']],
	JobsWidget : [['Job Number', 'job_number', 'e'], ['Part Number', 'part_number'], ['Due Date', 'date_to_start']]
};

export default headers;