const userType = require("./user");

const rootType = `#graphql
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType];
