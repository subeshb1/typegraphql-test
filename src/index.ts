import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server Started at http://localhost:4000");
  })
};

main();