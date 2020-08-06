const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var url = require('url');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}
var server = require("http").createServer(app)
username = "buitrungdung",
  password = "Rampage_972",
  server.listen(8080, (err) => {
    if (err) console.log("Err: " + err)
    console.log('Server is running')
  })
var options = {
  method: "POST",
  url: 'https://jirasoft.vnptmedia.vn/rest/api/2/issue/GPPMTRAIN-28/transitions?expand=transitions.fields',
  headers: {
    'User-Agent': 'RG',
    'Content-Type': 'application/json'
  },
  auth: {
    user: username,
    password: password
  },
}

requestToJira = (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error) {
        console.log("DONE JIRA")
        resolve(body)

      } else {
        reject(error);
      }
    });
  });
}

app.post('/*', async (res, req) => {
  let url = res.url.slice(1, res.url.length)
  options.url = url
  options.body = JSON.stringify(res.body)
  await requestToJira(options)
  console.log("done node")
  req.send(url)
})