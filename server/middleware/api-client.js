import pipedrive from 'pipedrive';

export default async function api_client(req, _, next) {
	const apiClient = new pipedrive.ApiClient();
	const {oauth2} = apiClient.authentications;
	oauth2.clientId = process.env.CLIENT_ID || '';
	oauth2.clientSecret = process.env.CLIENT_SECRET || '';
	oauth2.redirectUri = process.env.REDIRECT_URI || '';
	req.apiClient = apiClient;
	next();
}
