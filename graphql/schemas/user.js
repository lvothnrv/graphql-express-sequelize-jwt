module.exports = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Query {
    getUsers:[GetUsersResponse]
  }

  type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
  }

  type RegisterResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
  }

  type GetUsersResponse {
    id: ID!
    name: String!
    email: String!
  }
`;
