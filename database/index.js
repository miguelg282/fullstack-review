const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection-error'));
db.once('open', () => {
  console.log('DB connected!')
})

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  repo_name: String,
  name: String,
  repo_url: String
});

// each document will be a Repo (or instance) with properties and behaviors as declared in our schema
//Compiled 'Repo' model from schema
let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // console.log(data[0], 'is it an array?')
  data.forEach(element => {
    let repo = new Repo({
      repo_id: element.owner.id,
      name: element.owner.login,
      repo_name: element.owner.name,
      repo_url: element.owner.repos_url
    });
    repo.save();
    console.log(repo.name + ' Saved to repo collection');
  })
}

module.exports.save = save;