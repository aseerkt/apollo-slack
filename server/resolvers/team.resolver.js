import sequelize from '../db';
import formatErrors from '../utils/formatErrors';
import { isTeamOwner, requiresAuth } from '../utils/permissions';

export default {
  Team: {
    channels: function ({ id }, _args, { db }) {
      return db.Channel.findAll({ where: { teamId: id } });
    },
    members: function ({ id }, _args, { db }) {
      return db.User.findAll({
        include: {
          model: db.Team,
          as: 'memberTeam',
          where: { id },
          attributes: [],
        },
      });
    },
  },
  Query: {
    allTeams: requiresAuth(function (_rootm, args, { db, userId }) {
      return db.Team.findAll({
        include: [
          {
            as: 'teamMember',
            model: db.User,
            where: { id: userId },
            attributes: [],
            through: {
              attributes: [],
              where: { userId },
            },
          },
        ],
      });
    }),
    getTeam: requiresAuth(async function (root, { teamId }, { db, userId }) {
      return db.Team.findOne({
        where: {
          id: teamId,
        },
        include: [
          {
            attributes: [],
            as: 'teamMember',
            model: db.User,
            where: { id: userId },
            through: {
              where: { userId, teamId },
            },
          },
        ],
      });
    }),
    getTeamInvites: requiresAuth(function (root, args, { db, userId }) {
      return db.TeamInvite.findAll({
        where: { userId },
        include: {
          as: 'team',
          model: db.Team,
          include: {
            as: 'teamMember',
            model: db.User,
            through: {
              where: { role: 'INVITEE' },
            },
          },
        },
      });
    }),
  },
  Mutation: {
    createTeam: requiresAuth(async function (_root, { name }, { db, userId }) {
      try {
        const teamId = await sequelize.transaction(async function (t) {
          const team = await db.Team.create({ name }, { transaction: t });
          await db.Member.create(
            { teamId: team.id, userId, role: 'OWNER' },
            { transaction: t },
          );
          await db.Channel.bulkCreate(
            [
              { teamId: team.id, name: 'general', private: false },
              { teamId: team.id, name: 'random', private: false },
            ],
            { transaction: t },
          );
          return team.id;
        });
        return { teamId };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    }),
    inviteTeamMember: isTeamOwner(async function (
      root,
      { email, teamId },
      { db, userId },
    ) {
      try {
        const user = await db.User.findOne({ where: { email } });
        // to protect from spammers
        if (!user) return { ok: true };
        const isMember = team.teamMember.some((m) => m.email === email);
        if (user.id === userId || isMember)
          return {
            ok: false,
            errors: [
              {
                path: 'email',
                message: 'Already a member',
              },
            ],
          };
        await db.Member.create({
          userId: user.id,
          teamId,
          role: 'INVITEE',
        });
        return { ok: true };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    }),
    acceptTeamInvitation: requiresAuth(async function (
      root,
      { teamId },
      { db, userId },
    ) {
      console.log(teamId, userId);
      try {
        const invitation = db.TeamInvite.findOne({
          where: {
            teamId,
            userId,
          },
        });
        if (!invitation) return false;
        await sequelize.transaction(async function (t) {
          await db.Member.create({ teamId, userId }, { transaction: t });
          await db.TeamInvite.destroy(
            { where: { userId, teamId } },
            { transaction: t },
          );
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
