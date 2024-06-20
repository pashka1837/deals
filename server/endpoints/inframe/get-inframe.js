import error_response from "../../utils/error-handler.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default async function get_inframe(req, res) {
  try {
    const path_to_template = path.resolve(
      __dirname,
      "../../../build/index.html"
    );
    res.sendFile(path_to_template);
  } catch (error) {
    error_response(res, "Server error, couldn't load inframe page", error, 500);
  }
}
