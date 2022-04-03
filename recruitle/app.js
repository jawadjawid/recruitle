const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require("path");
//const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
//const schema = buildSchema(require("./graphql/schema.js")());
const auth = require('./auth');
const profile = require('./profile');
const job = require('./job');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookie = require('cookie');

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

const mongoose = require("mongoose");
const db = process.env.DB || require('./database/config').mongoURI;
const MongoDBStore = require("connect-mongodb-session")(session);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Mongo Connected...'))
    .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.use(function (req, res, next){
  req.username = (req.session.username)? req.session.username : null;
  let username = (req.session.username)? req.session.username : '';
  let userType = (req.session.userType)? req.session.userType : '';
  res.setHeader('Set-Cookie', [cookie.serialize('username', username, {
    path : '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
  }), cookie.serialize('userType', userType, {
    path : '/', 
    maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
  })]);
  console.log("HTTPS request", req.username, req.method, req.url, req.body);
  next();
});

app.use(function (req, res, next){
  console.log("HTTPS request", req.method, req.url, req.body);
  next();
});

const isAuthenticated = function(req, res, next) {
  if (!req.username) return res.status(401).end("access denied");
  next();
};

// curl -X POST -d "username=admin&password=pass4admin" https://localhost:3000/signup/
app.post('/signup/', auth.signup);

// curl -X POST -d "username=admin&password=pass4admin" https://localhost:3000/signin/
app.post('/signin/', auth.signin);

// curl -X POST -d https://localhost:3000/signout/
app.get('/signout/', auth.signout);

// upload new resume if authenticated
app.post('/resumes/', isAuthenticated, upload.single('file'), profile.uploadResume);

// get an resume given id
app.get('/resumes/:id/', isAuthenticated, profile.getResume);

app.post('/jobs/apply/', isAuthenticated, job.apply);

app.use(express.static(path.join(__dirname, ".", "/client/build")));
app.get('*', (req, res) => res.sendFile(path.resolve('./client', 'build', 'index.html')));

var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

const port = process.env.PORT || 3000;
// https.createServer(config, app).listen(PORT, function (err) {
//   if (err) console.log(err);
//   else console.log("HTTPS server on https://localhost:%s", PORT);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})