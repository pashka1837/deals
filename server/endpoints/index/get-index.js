// Import { readFile } from "fs/promises";
import error_response from '../../utils/error-handler.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default async function get_index(req, res) {
	const {userId, companyId} = req.query;

	if (!userId || !companyId) {
		const authUrl = req.apiClient.buildAuthorizationUrl();
		res.redirect(authUrl);
	} else {
		try {
			const path_to_template = path.resolve(
				__dirname,
				'../../../build/index.html',
			);

			res.sendFile(path_to_template);
		} catch (error) {
			error_response(res, 'Server error, couldn\'t load static page', error, 500);
		}
	}
}
