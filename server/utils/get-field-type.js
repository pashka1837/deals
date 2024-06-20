const data_type = {
	'First Name': 'varchar',
	'Last Name': 'varchar',
	Phone: 'phone',
	Email: 'varchar',
	'Job Type': 'varchar',
	'Job Source': 'varchar',
	'Job Desc': 'varchar',
	Address: 'address',
	City: 'varchar',
	State: 'varchar',
	'Zip code': 'double',
	Area: 'varchar',
	'Start Date': 'date',
	'Job start time': 'time',
	'Job end time': 'time',
	Technician: 'varchar',
};

export default function get_field_type(key) {
	return data_type[key] || 'varchar';
}
