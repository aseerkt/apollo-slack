import { authenticated } from '../utils/permissions';

export default {
  Mutation: {
    createChannel: authenticated(async function (root, args, { db, userId }) {
      try {
        await db.Channel.create({ ...args, userId });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
