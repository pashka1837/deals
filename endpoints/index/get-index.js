import { readFile } from "fs/promises";

export default async function get_index(req, res) {
  if (
    req.session.accessToken === null ||
    req.session.accessToken === undefined
  ) {
    const authUrl = req.apiClient.buildAuthorizationUrl();
    res.redirect(authUrl);
  }
  try {
    const template = await readFile("./dist/client/index.html", {
      encoding: "utf8",
    });
    const { render } = await import("../../dist/server/entry-server.js");

    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
}
