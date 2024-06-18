import pipedrive from "pipedrive";

export default async function apiClient(req, _, next) {
  const apiClient = new pipedrive.ApiClient();
  let oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId = process.env.CLIENT_ID || "";
  oauth2.clientSecret = process.env.CLIENT_SECRET || "";
  oauth2.redirectUri = process.env.REDIRECT_URI || "";
  req.apiClient = apiClient;
  next();
}
