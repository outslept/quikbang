import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const currentFileUrl = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFileUrl);

const app = express();

let bangIndex = {};
try {
  bangIndex = JSON.parse(
    fs.readFileSync(path.join(currentDir, "../data/bang-index.json"), "utf-8"),
  );
} catch (error) {
  console.error("Error loading bang index:", error);
}

app.get('/search', (req, res) => {
  const queryString = req.query.q;

  if (typeof queryString === "string") {
    const match = queryString.match(/^!(\w+)(?:\s(.+))?$/);

    if (match) {
      const bang = bangIndex[match[1]];

      if (bang) {
        return res.redirect(301,
          bang.u.replace("{{{s}}}", encodeURIComponent(match[2] || ""))
        );
      }
    }

    return res.redirect(301,
      `https://www.google.com/search?q=${encodeURIComponent(queryString)}`
    );
  }

  res.redirect(301, '/');
});

app.use((req, res, next) => {
  const queryString = req.query.q;

  if (typeof queryString === "string") {
    const match = queryString.match(/^!(\w+)(?:\s(.+))?$/);

    if (match) {
      const bang = bangIndex[match[1]];

      if (bang) {
        return res.redirect(
          bang.u.replace("{{{s}}}", encodeURIComponent(match[2] || "")),
        );
      }
    }

    return res.redirect(
      `https://www.google.com/search?q=${encodeURIComponent(queryString)}`,
    );
  }

  next();
});

app.use(express.static(path.join(currentDir, "../dist")));
app.use("/data", express.static(path.join(currentDir, "../data")));

app.get("*", (req, res) => {
  res.sendFile(path.join(currentDir, "../dist/index.html"));
});

export default function handler(req, res) {
  app(req, res);
}
