import express from "express";
import pipedrive from "pipedrive";
import "dotenv/config";

const PORT = process.env.PORT;

const defaultClient = new pipedrive.ApiClient();
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.API_KEY;

const app = express();

app.get("/", async (req, res) => {
  const api = new pipedrive.DealsApi(defaultClient);
  const deals = await api.getDeals();
  console.log(deals);
  res.send(deals);
});

app.post("/deal", async (req, res) => {
  try {
    console.log("Sending request...");

    const api = new pipedrive.DealsApi(defaultClient);

    const data = {
      title: "Deal of the century1",
      value: 10000,
      currency: "USD",
      user_id: null,
      person_id: null,
      org_id: 1,
      stage_id: 1,
      status: "open",
      expected_close_date: "2022-02-11",
      probability: 60,
      lost_reason: null,
      visible_to: 1,
      add_time: "2021-02-11",
    };
    const response = await api.addDeal(data);
    console.log("Deal was added successfully!", response);
    res.send("success");
  } catch (err) {
    const errorToLog = err.context?.body || err;
    res.status(404).send("failed");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
