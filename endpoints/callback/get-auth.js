export default async function get_auth(req, res) {
  const authCode = req.query.code;
  try {
    const { access_token } = await req.apiClient.authorize(authCode);
    req.session.accessToken = access_token;
    res.redirect("/");
  } catch (error) {
    console.log("error");
  }
}
