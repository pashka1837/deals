import error_response from '../../utils/error-handler.js';
import path from 'path';
import {fileURLToPath} from 'url';
import handle_response from '../../utils/res-handler.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default async function get_inframe(req, res) {
	const {userId, companyId} = req.query;
	if (!userId || !companyId) {
		handle_response(res, 'No credentials sent!', false, 403);
	} else {
		try {
			const path_to_template = path.resolve(
				__dirname,
				'../../../build/index.html',
			);

			res.sendFile(path_to_template);
		} catch (error) {
			error_response(res, 'Server error, couldn\'t load inframe page', error, 500);
		}
	}
}
