export default {
  Mutation: {
    async createMessage(root, args, { db }) {
      try {
        await db.message.create({ ...args });
      } catch (err) {}
    },
  },
};
