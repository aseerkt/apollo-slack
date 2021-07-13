import 'dotenv/config';
import chalk from 'chalk';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PORT } from './constants.js';
import schema from './schema.js';
import sequelize from './db/index.js';

async function startApolloServer() {
  await sequelize.sync();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, db: sequelize.models }),
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    chalk.blue.bold(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
  return { server, app };
}

startApolloServer();
