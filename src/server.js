const express = require("express");
const { formParser } = require("./middlewares/formParser");
const app = express();

app.use(express.json());

const port = 8080 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Jai Shri Ram");
});

app.post("/api/upload", formParser, (req, res) => {
  console.log("Hello");
  console.log("hi: ", req.files_urls);
  res.json({
    upload_urls: req.files_urls,
  });
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
