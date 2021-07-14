import { genSalt, hash } from 'bcryptjs';

export default function applyExtraSetup(sequelize) {
  const { Team, Channel, Message, User } = sequelize.models;

  // RELATIONS

  // team : owner
  Team.belongsTo(User, { foreignKey: 'owner' });
  User.hasMany(Team);

  // team : channel
  Channel.belongsTo(Team, { foreignKey: 'teamId' });
  Team.hasMany(Channel);

  // channel : message
  Message.belongsTo(Channel, { foreignKey: 'channelId' });
  Channel.hasMany(Message);

  // message : user
  Message.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Message);

  // team : memeber : user
  Team.belongsToMany(User, { through: 'members' });

  // HOOKS

  // hash password before create
  User.beforeCreate(async function (user) {
    const salt = await genSalt(12);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
  });
}
