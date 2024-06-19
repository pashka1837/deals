import pipedrive from "pipedrive";
import error_response from "../../utils/error-handler.js";

export default async function post_deal(req, res) {
  const formJson = req.body;
  // console.log(newDeal);
  if (!formJson) res.status(404).send({ ok: false, message: "Emty form" });
  try {
    req.apiClient.authentications.oauth2.accessToken = req.session.accessToken;

    // let apiInstance = new pipedrive.DealsApi(req.apiClient);

    // await apiInstance.addDeal(formJson);

    res.status(201).send({ ok: true, message: "Successfuly added a deal" });
  } catch (error) {
    error_response(
      res,
      "Server error, couldn't post deal to pipedrive",
      error,
      500
    );
  }
}
