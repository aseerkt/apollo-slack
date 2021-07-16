import formatErrors from '../utils/formatErrors';

export default {
  Mutation: {
    async createTeam(_root, args, { db, userId }) {
      if (!userId)
        return {
          ok: false,
          errors: [{ path: 'auth', message: 'Not Authenticated' }],
        };
      try {
        await db.Team.create({ ...args, owner: userId });
        return { ok: true };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    },
  },
};
