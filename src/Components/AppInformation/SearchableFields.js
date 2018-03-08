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
		'tool_type',
		'diameter',
		'material',
		'edp',
		'location'
	],
	orderMill: [
		'tool_type',
		'diameter',
		'material',
		'edp',
		// 'price',
		// 'quantity'
	],
	lathe: [
		'tool_type',
		'description',
		'material'
		// 'part_number',
		// 'location',
	],
	orderLathe: [
		'tool_type',
		'description',
		'material'
	],
	other: [
		'description',
		'notes',
		// 'location',
		// 'part_number'
	],
	orderOther: [
		'description',
		'notes'
	]
};

export default searchableFields;