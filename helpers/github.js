const request = require('request');
const config = require('../config.js');

//request sent to github.
let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  //look at gitHub api endpoints for user repos.
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;