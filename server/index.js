import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { CLIENT_URL, PORT, IS_PROD } from './constants.js';
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

  app.use(
    cors({
      origin: [CLIENT_URL, !IS_PROD && 'https://studio.apollographql.com'],
    }),
  );

  server.applyMiddleware({ app, cors: false });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    chalk.blue.bold(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
  return { server, app };
}

startApolloServer();
