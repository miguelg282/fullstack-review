const express = require('express');
let app = express();

const bodyparser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.json());

const {getReposByUsername} = require('../helpers/github.js');
const {save} = require('../database/index.js');



//we call the getReposByUsername here.
app.post('/repos', function (req, res) {
  let name = req.body.term;
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(name, (err, response, body) => {
    if (err) {
      res.status(400).send(err);
    } else {
      var data = JSON.parse(body);
      // console.log(data, '===ReSuLts===')
      save(data);
      res.status(200).send(data);
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

