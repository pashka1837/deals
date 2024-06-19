export default async function logger(req, _, next) {
  const { method, baseUrl, path } = req;
  console.log(`${method} ${baseUrl}${path}`);
  next();
}
