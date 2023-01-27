const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { GraphQLError } = require("graphql");

const UserModel = require("../../models/UserModel");

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { name, email, password } = args.input;
      const user = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password),
      });
      const token = jwt.sign({ id: user.id }, "mySecret");
      return { ...user.toJSON(), token };
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await UserModel.findOne({ where: { email } });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, "mySecret");
        return { ...user.toJSON(), token };
      } else {
        throw new GraphQLError(
          "Les informations d'identification sont invalides.",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }
    },
  },
  Query: {
    async getUsers(root, args, context) {
      const user = context.user;
      if (!user) {
        throw new GraphQLError("Vous devez être connecté pour accéder.", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      if (!user.admin) {
        throw new GraphQLError("Vous devez être admin.", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return UserModel.findAll();
    },
  },
};
