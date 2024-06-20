// Import { readFile } from "fs/promises";
import error_response from '../../utils/error-handler.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default async function get_index(req, res) {
	if (req.session.userId === null || req.session.userId === undefined) {
		const authUrl = req.apiClient.buildAuthorizationUrl();
		res.redirect(authUrl);
	}

	try {
		const path_to_template = path.resolve(
			__dirname,
			'../../../build/index.html',
		);

		res.cookie('userId', req.session.userId);
		res.cookie('companyId', req.session.companyId);

		res.sendFile(path_to_template);

		// Const path_to_template = path.resolve(
		//   __dirname,
		//   "../../../dist/client/index.html"
		// );

		// const template = await readFile(path_to_template, {
		//   encoding: "utf8",
		// });
		// const { render } = await import("../../../dist/server/entry-server.js");

		// const html = template.replace(`<!--outlet-->`, render);
		// res.status(200).set({ "Content-Type": "text/html" }).end(html);
	} catch (error) {
		error_response(res, 'Server error, couldn\'t load static page', error, 500);
	}
}
