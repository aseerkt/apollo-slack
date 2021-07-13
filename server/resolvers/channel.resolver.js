export default {
  Mutation: {
    async createChannel(root, args, { db }) {
      try {
        await db.channel.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
