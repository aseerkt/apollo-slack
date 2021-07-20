import { genSalt, hash } from 'bcryptjs';

export default function applyExtraSetup(sequelize) {
  const { Team, Channel, Message, User, TeamInvite } = sequelize.models;

  // RELATIONS

  // team : owner m:1
  Team.belongsTo(User, {
    as: 'owner',
    foreignKey: { name: 'ownerId', allowNull: false },
  });

  // team : channel 1:m
  Channel.belongsTo(Team, { foreignKey: { name: 'teamId', allowNull: false } });

  // channel : message 1:m
  Message.belongsTo(Channel, {
    foreignKey: { name: 'channelId', allowNull: false },
  });

  // message : user m:1
  Message.belongsTo(User, {
    as: 'user',
    foreignKey: { name: 'userId', allowNull: false },
  });

  // team : invite 1:m
  TeamInvite.belongsTo(Team, {
    as: 'team',
    foreignKey: { name: 'teamId', allowNull: false },
  });

  // invite : user m:1
  TeamInvite.belongsTo(User, {
    as: 'user',
    foreignKey: { name: 'userId', allowNull: false },
  });

  // team : memeber : user m:n
  Team.belongsToMany(User, {
    through: 'members',
    foreignKey: { name: 'teamId', allowNull: false },
  });
  User.belongsToMany(Team, {
    through: 'members',
    foreignKey: { name: 'userId', allowNull: false },
  });

  // HOOKS

  // hash password before create
  User.beforeCreate(async function (user) {
    const salt = await genSalt(12);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
  });
}
