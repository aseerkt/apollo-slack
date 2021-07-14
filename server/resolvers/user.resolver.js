export default {
  Query: {
    getUser(root, { id }, { db }) {
      return db.User.findOne({ where: { id } });
    },
    allUsers(root, args, { db }) {
      return db.User.findAll({});
    },
  },
  Mutation: {
    async register(root, args, { db }, info) {
      try {
        await db.User.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
