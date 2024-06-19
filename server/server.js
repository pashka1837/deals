/* eslint-disable no-undef */
import express from "express";
import pipedrive from "pipedrive";
import "dotenv/config";

import * as url from "url";
import path from "path";
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT;

const defaultClient = new pipedrive.ApiClient();
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.API_KEY;

const app = express();
console.log(path.join(__dirname, "./dist/index.html"));

app.use("/static", express.static(path.join(__dirname, "dist/assets")));

app.all("/", async (req, res) => {
  console.log("all");
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/", async (req, res) => {
  const api = new pipedrive.DealsApi(defaultClient);
  const deals = await api.getDeals();
  console.log(deals);
  res.send("get deals");
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
    res.send({ message: "succes" });
  } catch (err) {
    // const errorToLog = err.context?.body || err;
    res.status(404).send("failed");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
