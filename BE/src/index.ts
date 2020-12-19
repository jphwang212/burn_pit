import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cors from "cors";
// https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c
// https://www.youtube.com/watch?v=uCbFMZYQbxE n+1 problem use dataloader
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";

import { Resolvers } from "./resolvers/Resolvers";
import { Types } from "./types/types";

mongoose.connect("mongodb://localhost:27017/personalityApp", {
  useNewUrlParser: true,
});
mongoose.set("debug", true);

(async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [Types],
    resolvers: [Resolvers],
  });
  app.use("*", cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: 3002 }, (): void =>
    console.log(
      `\n🚀   GraphQL is now running on http://localhost:3002/graphql`
    )
  );
})();
