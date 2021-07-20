import sequelize from '../db';
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
    getTeamInvites: requiresAuth(function (root, args, { db, userId }) {
      return db.TeamInvite.findAll({
        where: { userId },
        include: {
          as: 'team',
          model: db.Team,
          include: {
            as: 'owner',
            model: db.User,
          },
        },
      });
    }),
  },
  Mutation: {
    createTeam: requiresAuth(async function (_root, args, { db, userId }) {
      const t = await sequelize.transaction();
      try {
        const team = await db.Team.create(
          { ...args, ownerId: userId },
          { transaction: t },
        );
        await db.Channel.bulkCreate(
          [
            { teamId: team.id, name: 'general', private: false },
            { teamId: team.id, name: 'random', private: false },
          ],
          { transaction: t },
        );
        await t.commit();
        return { ok: true };
      } catch (err) {
        console.log(err);
        await t.rollback();
        return { ok: false, errors: formatErrors(err) };
      }
    }),
    inviteTeamMember: requiresAuth(async function (
      root,
      { email, teamId },
      { db, userId },
    ) {
      try {
        const team = await db.Team.findOne({
          where: { ownerId: userId, id: teamId },
        });
        if (!team) return false;
        const user = await db.User.findOne({ where: { email } });
        if (!user) return false;
        if (user.id === parseInt(userId)) return false;
        await db.TeamInvite.create({
          userId: user.id,
          teamId: team.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
