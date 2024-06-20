import { saveInstallation } from "../../../db/db.js";
import error_response from "../../utils/error-handler.js";

export default async function get_auth(req, res) {
  const authCode = req.query.code;

  if (!authCode) res.status(400);
  try {
    const { access_token, refresh_token } = await req.apiClient.authorize(
      authCode
    );

    const companyId = authCode.split(".")[0];
    const userId = authCode.split(".")[1];

    await saveInstallation(userId, companyId, { access_token, refresh_token });

    // req.apiClient.authentications.oauth2.tokenUpdateCallback = function (
    //   token
    // ) {
    //   req.session.accessToken = token.access_token;
    // };

    req.session.userId = userId;
    req.session.companyId = companyId;
    res.redirect("/");
  } catch (error) {
    error_response(res, "Forbidden, couldn't auth", error, 403);
  }
}
