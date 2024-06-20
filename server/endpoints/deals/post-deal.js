import error_response from "../../utils/error-handler.js";
import {
  add_new_deal,
  get_deal_fields,
  get_deal_obj,
} from "../../api/deal-api.js";

export default async function post_deal(req, res) {
  const formJson = req.body;
  if (!formJson) res.status(404).send({ ok: false, message: "Emty form" });

  try {
    req.apiClient.authentications.oauth2.accessToken = req.session.accessToken;

    const api_client = req.apiClient;

    const exising_fields = await get_deal_fields(api_client);

    const new_deal = await get_deal_obj(formJson, exising_fields, api_client);

    // console.log(new_deal);

    await add_new_deal(new_deal, api_client);

    res.status(201).send({ ok: true, message: "Successfuly added a deal" });
  } catch (error) {
    // console.log("error", error);
    error_response(
      res,
      "Server error, couldn't post deal to pipedrive",
      error,
      500
    );
  }
}
