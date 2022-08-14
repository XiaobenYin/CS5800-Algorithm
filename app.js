const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const graph_generator = require("./utility/graph_generator");

var bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json());

app.get("/generate/", (req, res) => {
  var node = req.query.node || 10;
  var density = req.query.density || 0.2;
  var isLive = req.query.isLive == "Y";
  var isRaw = req.query.isRaw == "Y";

  let response = graph_generator.generate(node, density, isLive, isRaw);
  if (isLive) {
    res.send(response);
  } else {
    res.json({ filename: response });
  }
});

app.use(express.static("public"));
app.use("/maps", express.static(path.join(__dirname, "maps")));

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
