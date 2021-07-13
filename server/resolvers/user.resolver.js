export default {
  Query: {
    getUser(root, { id }, { db }) {
      return db.user.findOne({ where: { id } });
    },
    allUsers(root, args, { db }) {
      return db.user.findAll({});
    },
  },
  Mutation: {
    createUser(root, args, { db }, info) {
      return db.user.create(args);
    },
  },
};
