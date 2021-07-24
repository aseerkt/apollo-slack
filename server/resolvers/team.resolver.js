import sequelize from '../db';
import formatErrors from '../utils/formatErrors';
import { requiresAuth } from '../utils/permissions';
import { Op } from 'sequelize';

export default {
  Team: {
    channels: function (root, args, { db }) {
      return db.Channel.findAll({ where: { teamId: root.id } });
    },
    members: function ({ id }, args, { db }) {
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
        where: {
          [Op.or]: [{ ownerId: userId }, { '$memberUser.id$': userId }],
        },
        include: [
          {
            as: 'memberUser',
            model: db.User,
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
          [Op.or]: [
            {
              '$memberUser.id$': userId,
            },
            {
              ownerId: userId,
            },
          ],
        },
        include: [
          {
            attributes: [],
            as: 'memberUser',
            model: db.User,
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
            as: 'owner',
            model: db.User,
          },
        },
      });
    }),
  },
  Mutation: {
    createTeam: requiresAuth(async function (_root, args, { db, userId }) {
      try {
        await sequelize.transaction(async function (t) {
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
        });
        return { teamId: team.id };
      } catch (err) {
        console.log(err);
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
        if (!team)
          return {
            ok: false,
            errors: [{ path: 'unknown', message: 'Something went wrong' }],
          };
        const user = await db.User.findOne({ where: { email } });
        // to protect from spammers
        if (!user) return { ok: true };
        if (user.id === userId)
          return {
            ok: false,
            errors: [
              {
                path: 'email',
                message: 'Already a member',
              },
            ],
          };
        await db.TeamInvite.create({
          userId: user.id,
          teamId: team.id,
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
