import { Op, QueryTypes } from 'sequelize';
import sequelize from '../db';
import formatErrors from '../utils/formatErrors';
import { isTeamOwner, requiresAuth } from '../utils/permissions';

export default {
  Team: {
    channels: function ({ id }, _args, { db }) {
      return db.Channel.findAll({ where: { teamId: id } });
    },
    members: async function ({ id }, _args, { db }) {
      const members = await sequelize.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          tm.role
        FROM users u
        JOIN tmembers tm
        ON tm."userId"=u.id
        WHERE tm."teamId"=2;`,
        { raw: true, type: QueryTypes.SELECT },
      );
      console.log(members);

      return members;
    },
  },
  Query: {
    allTeams: requiresAuth(function (_rootm, args, { db, userId }) {
      return db.Team.findAll(
        {
          include: [
            {
              as: 'teamMember',
              model: db.User,
              where: { id: userId },
              attributes: [],
              through: {
                attributes: [],
                where: {
                  userId,
                  role: {
                    [Op.or]: ['OWNER', 'MEMBER'],
                  },
                },
              },
            },
          ],
        },
        { raw: true },
      );
    }),
    getTeam: requiresAuth(async function (root, { teamId }, { db, userId }) {
      return db.Team.findOne(
        {
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
        },
        { raw: true },
      );
    }),
    getInvitedTeams: requiresAuth(function (root, args, { db, userId }) {
      return db.Team.findAll({
        include: {
          as: 'teamMember',
          model: db.User,
          where: { id: userId },
          through: {
            where: { role: 'INVITEE' },
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
          await db.TMember.create(
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
      try {
        await db.TMember.update(
          { role: 'MEMBER' },
          { where: { teamId, userId, role: 'INVITEE' } },
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
