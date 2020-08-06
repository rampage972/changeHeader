var port = process.env.PORT || 8080;
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var url = require("url");
const { json } = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());


// set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + "/public"));

// set the home page route
app.get("/", function (req, res) {
  // ejs render automatically looks in the views folder
  res.render("index");
});

app.listen(port, function () {
  console.log("Our app is running on port" + port);
})
var options = {
  method: "POST",
  url:
    "https://jirasoft.vnptmedia.vn/rest/api/2/issue/GPPMTRAIN-28/transitions?expand=transitions.fields",
  headers: {
    "User-Agent": "RG",
    "Content-Type": "application/json",
  },
};

requestToJira = (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

app.post("/*", async (res, req) => {
  let url = res.url.slice(1, res.url.length);
  options.url = url;
  options.body = JSON.stringify(res.body);
  options.headers = {
    "User-Agent": "RG",
    "Content-Type": "application/json",
    authorization: res.headers.authorization,
  };
  await requestToJira(options);
  req.send(url);
});
