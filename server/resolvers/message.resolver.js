import formatErrors from '../utils/formatErrors';
import { requiresAuth } from '../utils/permissions';
import { PubSub, withFilter } from 'graphql-subscriptions';

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

const pubsub = new PubSub();

export default {
  Message: {
    user: ({ user, userId }, args, { db }) => {
      if (user) return user;
      return db.User.finOne({ where: { id: userId } });
    },
  },
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId,
      ),
    },
  },
  Query: {
    getMessages: requiresAuth(async function (root, { channelId }, { db }) {
      const messages = await db.Message.findAll({
        where: { channelId },
        include: {
          as: 'user',
          model: db.User,
        },
        order: [['createdAt', 'DESC']],
      });
      return messages;
    }),
  },
  Mutation: {
    createMessage: requiresAuth(async function (
      root,
      { channelId, text },
      { db, userId },
    ) {
      try {
        const message = await db.Message.create(
          {
            channelId,
            text,
            userId,
          },
          { raw: true },
        );

        const currentUser = await db.User.findOne({ where: { id: userId } });

        pubsub.publish(NEW_CHANNEL_MESSAGE, {
          channelId,
          newChannelMessage: {
            ...message.dataValues,
            user: currentUser.dataValues,
          },
        });
        return { message: message.dataValues };
      } catch (err) {
        console.log(err);
        return { errors: formatErrors(err) };
      }
    }),
  },
};
