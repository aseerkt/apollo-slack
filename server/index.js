import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { CLIENT_URL, PORT, IS_PROD } from './constants.js';
import schema from './schema.js';
import sequelize from './db/index.js';
import { extractAndIssueTokens, getCookieToken } from './utils/cookieHelper.js';
import { verifyTokens } from './utils/jwtHelper';

async function startApolloServer() {
  await sequelize.sync({ force: true });

  const server = new ApolloServer({
    schema,
    context: function ({ req, res }) {
      const { userId } = extractAndIssueTokens(req, res);
      return { req, res, db: sequelize.models, userId };
    },
  });
  await server.start();

  const app = express();

  app.use(
    cors({
      origin: [CLIENT_URL, !IS_PROD && 'https://studio.apollographql.com'],
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
