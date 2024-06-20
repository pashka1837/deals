/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import api_client from "./middleware/api-client.js";
import get_auth from "./endpoints/callback/get-auth.js";
import get_index from "./endpoints/index/get-index.js";
import post_deal from "./endpoints/deals/post-deal.js";
import logger from "./middleware/logger.js";
import check_jwt from "./middleware/jwt-check.js";
import get_inframe from "./endpoints/inframe/get-inframe.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT;

const app = express();

app.use(logger);

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.use("/assets", express.static(path.resolve(__dirname, "../build/assets")));
// app.use(
//   express.static(path.resolve(__dirname, "../dist/client"), { index: false })
// );

app.use(api_client);

app.get("/callback", get_auth);

app.get("/", get_index);

app.get("/inframe", check_jwt(), get_inframe);

app.post("/deal", post_deal);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
