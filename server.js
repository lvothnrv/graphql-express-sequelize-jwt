const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const context = require("./graphql/context");
const morgan = require("morgan");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

(async () => {
  await server.start();
  await sequelize.sync();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  app.listen(4000, async () => {
    try {
      await sequelize.authenticate();
      console.log("Connexion avec la base de donnée établie.");
    } catch (error) {
      console.error("Erreur pour se connecter à la base de donnée.", error);
    }
    console.log("Le serveur écoute sur le port 4000.");
  });
})();
