import pipedrive from "pipedrive";

export default async function post_deal(req, res) {
  const newDeal = req.body;
  console.log(newDeal);
  if (!newDeal) res.status(404).send({ message: "failed to add deal" });
  try {
    // let { oauth2 } = req.apiClient.authentications;
    // oauth2.accessToken = req.session.accessToken;
    req.apiClient.authentications.oauth2.accessToken = req.session.accessToken;
    // console.log(req.apiClient.authentications.oauth2.expiresAt);

    let apiInstance = new pipedrive.DealsApi(req.apiClient);

    // const api_res =
    await apiInstance.addDeal(newDeal);

    res.send({ message: "success" });
    console.log("Successfuly added a deal");
  } catch (err) {
    console.log("Server error, could'nt post a deal");
    res.status(404).send({ message: "failed to add deal" });
  }
}
