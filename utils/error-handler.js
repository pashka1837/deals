export default async function error_response(res, title, error, s_code) {
  console.error(`[${new Date().toISOString()}] ${title}: ${error.message}`);
  res.status(s_code).send({
    ok: false,
    message: title,
  });
}
