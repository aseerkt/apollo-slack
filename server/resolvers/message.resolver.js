import formatErrors from '../utils/formatErrors';
import { authenticated } from '../utils/permissions';

export default {
  Query: {
    getMessages: authenticated(function (root, { channelId }, { db }) {
      return db.Message.findAll({
        where: { channelId },
        include: {
          as: 'user',
          model: db.User,
        },
      });
    }),
  },
  Mutation: {
    createMessage: authenticated(async function (
      root,
      { channelId, text },
      { db, userId },
    ) {
      try {
        const message = await db.Message.create({
          channelId,
          text,
          userId,
        });
        return { message };
      } catch (err) {
        console.log(err);
        return { errors: formatErrors(err) };
      }
    }),
  },
};
