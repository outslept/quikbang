const fs = require("fs");
const path = require("path");

let bangIndex = {};
try {
  bangIndex = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/bang-index.json"), "utf-8"),
  );
} catch (error) {
  console.error("Error loading bang index:", error);
}

module.exports = function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const queryString = url.searchParams.get("q");

  if (typeof queryString === "string") {
    const match = queryString.match(/^!(\w+)(?:\s(.+))?$/);

    if (match) {
      const bang = bangIndex[match[1]];

      if (bang) {
        res.writeHead(301, {
          Location: bang.u.replace(
            "{{{s}}}",
            encodeURIComponent(match[2] || ""),
          ),
        });
        return res.end();
      }
    }

    res.writeHead(301, {
      Location: `https://www.google.com/search?q=${encodeURIComponent(queryString)}`,
    });
    return res.end();
  }

  res.writeHead(301, { Location: "/" });
  res.end();
};
