export default async function handle_response(res, title, ok, s_code) {
	console.error(`[${new Date().toISOString()}] ${title}`);
	res.status(s_code).send({
		ok: true,
		message: title,
	});
}
