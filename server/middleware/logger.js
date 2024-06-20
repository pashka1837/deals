export default async function logger(req, _, next) {
	const {method, baseUrl, path} = req;
	console.log(`[${new Date().toISOString()}] ${method} ${baseUrl}${path}`);
	next();
}
