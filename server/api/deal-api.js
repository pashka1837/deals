import pipedrive from 'pipedrive';
import get_field_type from '../utils/get-field-type.js';

async function get_deal_fields(api_client) {
	const dealFieldsApi = new pipedrive.DealFieldsApi(api_client);
	const get_deal_fields_res = await dealFieldsApi.getDealFields();
	const {data: exising_fields} = get_deal_fields_res;
	return exising_fields;
}

async function add_deal_field(api_client, new_field_name) {
	const dealFieldsApi = new pipedrive.DealFieldsApi(api_client);
	const add_deal_field_res = await dealFieldsApi.addDealField({
		name: new_field_name,
		field_type: get_field_type(new_field_name),
	});
	const {data: new_field} = add_deal_field_res;
	return new_field.key;
}

async function get_deal_obj(form_json, exising_fields, api_client) {
	const new_deal = {
		title: `New Job #${Date.now()}`,
	};

	for (const new_field_name in form_json) {
		const existing_field = exising_fields.find(
			old_field => old_field.name === new_field_name,
		);
		if (existing_field) {
			new_deal[existing_field.key] = form_json[new_field_name];
			continue;
		}

		const new_field_key = await add_deal_field(api_client, new_field_name);
		new_deal[new_field_key] = form_json[new_field_name];
	}

	return new_deal;
}

async function add_new_deal(new_deal_obj, api_client) {
	const dealsApi = new pipedrive.DealsApi(api_client);
	const deal_api_res = await dealsApi.addDeal(new_deal_obj);
	const {data} = deal_api_res;
	return data.id;
}

export {
	get_deal_fields, add_deal_field, get_deal_obj, add_new_deal,
};
