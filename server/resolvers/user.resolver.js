import formatErrors from '../utils/formatErrors';

export default {
  Query: {
    getUser(root, { id }, { db }) {
      return db.User.findOne({ where: { id } });
    },
    allUsers(root, args, { db }) {
      return db.User.findAll();
    },
  },
  Mutation: {
    async register(root, args, { db }, info) {
      try {
        const user = await db.User.create(args);
        return { ok: true, user };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    },
  },
};
