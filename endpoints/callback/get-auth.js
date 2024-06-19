export default async function get_auth(req, res) {
  const authCode = req.query.code;
  if (!authCode) res.status(404);
  try {
    const { access_token, refresh_token } = await req.apiClient.authorize(
      authCode
    );
    console.log("refresh_token", refresh_token);
    req.session.accessToken = access_token;
    res.redirect("/");
  } catch (e) {
    console.log("Auth error");
    res.status(404).send({ message: "Auth error" });
  }
}
