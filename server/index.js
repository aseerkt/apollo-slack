import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
import { CLIENT_URL, PORT, IS_PROD } from './constants.js';
import schema from './schema.js';
import sequelize from './db/index.js';
import { extractAndIssueTokens } from './utils/cookieHelper.js';

async function startApolloServer() {
  await sequelize.sync();

  const server = new ApolloServer({
    schema,
    context: function ({ req, res }) {
      const { userId } = extractAndIssueTokens(req, res);
      return { req, res, db: sequelize.models, userId };
    },
    plugins: [!IS_PROD && ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();

  const app = express();

  app.use(
    cors({
      origin: [CLIENT_URL],
      credentials: true,
    }),
  );

  app.use(cookieParser());

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
