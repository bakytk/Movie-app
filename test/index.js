
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server/index');
const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);
let ACCESS_TOKEN = "";

before(function (done) {
  agent
    .post('/auth')
    .set('content-type', 'application/json')
    .send({
      username: 'premium-jim',
      password: 'GBLtTyq3E_UNjFnpo9m6'
    })
    .then(function (res) {
      ACCESS_TOKEN = res.body.token;
      console.log("token: ", ACCESS_TOKEN);
      done();
    })
    .catch(function (err) {
      done(err);
    });
});

describe('movie', function () {
  it('POST movies', function (done) {
    agent
      .post('/movies')
      .set('authorization', `Bearer ${ACCESS_TOKEN}`)
      .send({
        "title": "Titanic"
      })
      .end(function (err, res) {
          //console.log("saved movie data", res.body);
          res.should.have.status(200);
          done();
      });
  }),
  it('GET movies', function (done) {
    agent
      .get('/movies')
      .set('authorization', `Bearer ${ACCESS_TOKEN}`)
      .send()
      .end(function (err, res) {
          //console.log("movies list", res.body);
          res.should.have.status(200);
          done();
      });
  });
});

after(function () {
  agent.close();
});
