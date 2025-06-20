import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname, "dist")));
app.use("/data", express.static(join(__dirname, "data")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server runs on port ${process.env.PORT || 3000}`);
  });
}

// eslint-disable-next-line import/no-default-export
export default app;
