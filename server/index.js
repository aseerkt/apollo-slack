import http from 'http';
import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
import { CLIENT_URL, PORT, IS_PROD } from './constants.js';
import schema from './schema.js';
import sequelize from './db';
import { extractAndIssueTokens } from './utils/cookieHelper.js';

async function startApolloServer() {
  await sequelize.authenticate({});

  const app = express();

  app.use(
    cors({
      origin: [CLIENT_URL],
      credentials: true,
    }),
  );

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: function ({ req, res }) {
      const { userId } = extractAndIssueTokens(req, res);
      return { req, res, db: sequelize.models, userId };
    },
    ...(!IS_PROD
      ? { plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] }
      : {}),
  });

  await server.start();

  app.use(cookieParser());

  server.applyMiddleware({ app, cors: false });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath },
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    chalk.blue.bold(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );

  return { server, app };
}

startApolloServer();
