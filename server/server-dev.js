import fs from "fs";
import express from "express";
import { createServer } from "vite";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import apiClient from "./middleware/api-client.js";
import get_auth from "./endpoints/callback/get-auth.js";

const app = express();

const PORT = process.env.PORT;

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);
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

app.get("/", async (req, res) => {
  const url = req.originalUrl;
  try {
    const template = await vite.transformIndexHtml(
      url,
      fs.readFileSync("index.html", "utf-8")
    );
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.post("/deal", async (req, res) => {
  console.log(req.body);
  try {
    console.log("Sending request...");

    console.log("Deal was added successfully!");
    res.send({ message: "success" });
  } catch (err) {
    res.status(404).send("failed");
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}.`);
});
