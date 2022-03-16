module.exports = function(){
  var schema = `
  type Query {
    hello: String
    boy: Boy
    user(id: String): User
  }

  type Boy {
    id: String
    hobby: String
  }

  type User {
    id: String
    password: String
  }
`;

  return schema;
}