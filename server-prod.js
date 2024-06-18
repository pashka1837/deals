/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import apiClient from "./middleware/api-client.js";
import get_auth from "./endpoints/callback/get-auth.js";
import get_index from "./endpoints/index/get-index.js";
import post_deal from "./endpoints/deals/post-deal.js";

const PORT = process.env.PORT;

const app = express();

app.use(
  express.static(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist/client"),
    { index: false }
  )
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);
app.use(apiClient);

app.get("/callback", get_auth);

app.get("/", get_index);

app.post("/deal", post_deal);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
