export default {
  Mutation: {
    async createMessage(root, args, { db }) {
      try {
        await db.Message.create({ ...args });
      } catch (err) {}
    },
  },
};
