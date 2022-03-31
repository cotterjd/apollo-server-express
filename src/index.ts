import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import * as http from 'http';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.get(`/foo`, (req, res) => res.send(`hey`))
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const typeDefs = gql`
  type Query {
    getNums: Int
  }
`
const resolvers = {
  Query: {
    getNums: () => 1
  }
}
startApolloServer(typeDefs, resolvers)

