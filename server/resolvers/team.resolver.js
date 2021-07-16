import formatErrors from '../utils/formatErrors';
import authenticated from '../utils/permissions';

export default {
  Mutation: {
    createTeam: authenticated(async function (_root, args, { db, userId }) {
      try {
        await db.Team.create({ ...args, ownerId: userId });
        return { ok: true };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    }),
  },
};
