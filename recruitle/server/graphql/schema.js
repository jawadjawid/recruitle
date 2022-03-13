module.exports = function(){
  var schema = `
  type Query {
    hello: String
    boy: Boy
  }

  type Boy {
    id: String
    hobby: String
  }
`;

  return schema;
}