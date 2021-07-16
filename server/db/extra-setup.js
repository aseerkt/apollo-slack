import { genSalt, hash } from 'bcryptjs';

export default function applyExtraSetup(sequelize) {
  const { Team, Channel, Message, User } = sequelize.models;

  // RELATIONS

  // team : owner m:1
  Team.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

  // team : channel 1:m
  Channel.belongsTo(Team, { foreignKey: 'teamId' });

  // channel : message 1:m
  Message.belongsTo(Channel, { foreignKey: 'channelId' });

  // message : user m:1
  Message.belongsTo(User, { foreignKey: 'userId' });

  // team : memeber : user m:n
  Team.belongsToMany(User, { through: 'members', foreignKey: 'teamId' });
  User.belongsToMany(Team, { through: 'members', foreignKey: 'userId' });

  // HOOKS

  // hash password before create
  User.beforeCreate(async function (user) {
    const salt = await genSalt(12);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
  });
}
