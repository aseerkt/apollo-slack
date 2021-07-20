import formatErrors from '../utils/formatErrors';
import { requiresAuth } from '../utils/permissions';

export default {
  Team: {
    channels: function (root, args, { db }) {
      return db.Channel.findAll({ where: { teamId: root.id } });
    },
  },
  Query: {
    allTeams: requiresAuth(function (_rootm, args, { db, userId }) {
      return db.Team.findAll({ where: { ownerId: userId } });
    }),
    getTeam: requiresAuth(async function (root, args, { db, userId }) {
      return db.Team.findOne({ where: { ownerId: userId, id: args.teamId } });
    }),
  },
  Mutation: {
    createTeam: requiresAuth(async function (_root, args, { db, userId }) {
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
