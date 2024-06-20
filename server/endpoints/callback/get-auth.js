import {saveInstallation} from '../../../db/db.js';
import error_response from '../../utils/error-handler.js';
import handle_response from '../../utils/res-handler.js';

export default async function get_auth(req, res) {
	const authCode = req.query.code;

	if (!authCode) {
		handle_response(res, 'No credentials sent!', false, 403);
	}

	try {
		const {access_token, refresh_token} = await req.apiClient.authorize(
			authCode,
		);

		const companyId = authCode.split('.')[0];
		const userId = authCode.split('.')[1];

		await saveInstallation(userId, companyId, {access_token, refresh_token});

		req.apiClient.authentications.oauth2.tokenUpdateCallback = async function (token) {
			await saveInstallation(userId, companyId, {access_token: token.access_token, refresh_token: token.refresh_token});
		};

		res.redirect(`/?userId=${userId}&companyId=${companyId}`);
	} catch (error) {
		error_response(res, 'Forbidden, couldn\'t auth', error, 403);
	}
}
