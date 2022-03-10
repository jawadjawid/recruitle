const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require("path");
const resolvers = require('./graphql/resolvers');
const schema = buildSchema(require("./graphql/schema.js")());

app.use(express.static(path.join(__dirname, "..", "/client/build")));
app.use(express.static("../client/public"));

var root = {
  hello: resolvers.hello(),
  boy: resolvers.boy()
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

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