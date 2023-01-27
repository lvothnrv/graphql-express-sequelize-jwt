const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, "mySecret");
    const user = await UserModel.findByPk(id);
    return user;
  } catch (error) {
    throw new GraphQLError("L'utilisateur n'est pas authentifié.", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || "";
  const user = await verifyToken(token);
  return { user };
};
