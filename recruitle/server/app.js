const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require("path");
const resolvers = require('./graphql/resolvers');
const schema = buildSchema(require("./graphql/schema.js")());
const auth = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var root = {
  hello: resolvers.hello(),
  boy: resolvers.boy(),
  user: resolvers.user(),
};

const cookie = require('cookie');

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(express.static(path.join(__dirname, "..", "/client/build")));
// app.use(express.static("../client/public"));
app.get('*', (req, res) => res.sendFile(path.resolve('../client', 'build', 'index.html')));

app.use(function (req, res, next){
  let cookies = cookie.parse(req.headers.cookie || '');
  req.username = (cookies.username)? cookies.username : null;
  console.log("HTTPS request", req.username, req.method, req.url, req.body);
  next();
});

app.use(function (req, res, next){
  console.log("HTTPS request", req.method, req.url, req.body);
  next();
});

const isAuthenticated = function(req, res, next) {
  if (!req.session.username) return res.status(401).end("access denied");
  next();
};

// curl -X POST -d "username=admin&password=pass4admin" https://localhost:3000/signup/
app.post('/signup/', auth.signup);

// curl -X POST -d "username=admin&password=pass4admin" https://localhost:3000/signin/
app.post('/signin/', auth.signin);

var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

const PORT = 3000;
https.createServer(config, app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTPS server on https://localhost:%s", PORT);
});