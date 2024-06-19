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

// import * as url from "url";
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

app.use(
  express.static(path.resolve(__dirname, "../dist/client"), { index: false })
);

app.use(api_client);

// z

//   try {
//     const api_res = await fetch({
//       method: "POST",
//       url: "https://oauth.pipedrive.com/oauth/token",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
//         ).toString("base64")}`,
//         "content-type": "application/x-www-form-urlencoded",
//       },
//       body: JSON.stringify({
//         grant_type: "refresh_token",
//         refresh_token,
//       }),
//     });
//     console.log(api_res);
//   } catch (error) {
//     throw new Error("Getting new token from refresh token failed");
//   }
// }
// next();
//   }
// });
// const some = await readFile("./dist/client/index.html", {
//   encoding: "utf8",
// });
// console.log(some);
app.get("/callback", get_auth);

app.get("/", get_index);

app.post("/deal", post_deal);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
