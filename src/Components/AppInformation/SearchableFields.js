let searchableFields = {
	parts: [
		'part_number',
		'part_revision',
		'part_name',
		'customer'
	],
	jobs: [
		'job_number',
		'part_number',
		'description',
		'date_to_start',
		'date_started'	
	],
	users: [
		'name',
		'company_name',
		'email'
	],
	company: [
		'name',
		'_id',
		'street_address'
	],
	mill: [
		'type',
		'diameter',
		'flutes',
		'material',
		'edp',
		'part_number'
	],
	lathe: [
		'type',
		'description',
		'insert',
		'material',
		'part_number'
	],
	other: [
		'description',
		'material',
		'part_number'
	]
};

export default searchableFields;