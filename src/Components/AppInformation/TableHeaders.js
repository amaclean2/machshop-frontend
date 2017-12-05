let headers = {
	Parts : [['Part Number', 'part_number', 'e'], ['Revision', 'part_revision'], ['Part Name', 'part_name'], ['Customer', 'customer']],
	MiniJobs : [['Job Number', 'job_number', 'e'], ['Start Date', 'start_date']],
	Jobs  : [['Job Number', 'job_number', 'e'], ['Part Number', 'part_number'], ['Description', 'job_description'], ['Date Started', 'date_started']]
};

export default headers;