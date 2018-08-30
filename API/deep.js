var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
app.use(bodyParser.json());
var fs = require('fs');
var multiparty = require('multiparty');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
var path = __dirname + "/img/";

router.post("/", (req,res) => {
  function label (location) {
    client
    .textDetection(location)
    .then(results => {
      console.log(location);
      fs.unlinkSync(location);
      const detections = results[0].fullTextAnnotation;
      res.setHeader('content-type', 'application/json');
      res.send({ text: detections, all: results[0] });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  }
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    console.log(fields, files)
    let part = files.file[0].path
    label(part)
    console.log('Upload completed!');
  });
})

module.exports = router;
