import error_response from '../../utils/error-handler.js';
import {
	add_new_deal,
	get_deal_fields,
	get_deal_obj,
} from '../../api/deal-api.js';
import {getClientInstallation} from '../../../db/db.js';

export default async function post_deal(req, res) {
	const formJson = req.body;

	if (!formJson) {
		res.status(404).send({ok: false, message: 'Empty form'});
	}

	const {userId, companyId} = req.query;
	try {
		const user = await getClientInstallation(userId, companyId);
		const {access_token, refresh_token} = user;

		req.apiClient.authentications.oauth2.accessToken = access_token;
		req.apiClient.authentications.oauth2.refreshToken = refresh_token;

		const api_client = req.apiClient;

		const exising_fields = await get_deal_fields(api_client);

		const new_deal = await get_deal_obj(formJson, exising_fields, api_client);

		const new_deal_id = await add_new_deal(new_deal, api_client);

		res
			.status(201)
			.send({ok: true, message: 'Successfuly added a deal', id: new_deal_id});
	} catch (error) {
		error_response(
			res,
			'Server error, couldn\'t post deal to pipedrive',
			error,
			500,
		);
	}
}
