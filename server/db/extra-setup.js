import { genSalt, hash } from 'bcryptjs';

export default function applyExtraSetup(sequelize) {
  const { Team, Channel, Message, User, TMember, PCMember } = sequelize.models;

  // RELATIONS

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

  // MANY TO MANY

  // team : tmemeber : user m:n
  Team.belongsToMany(User, {
    through: { model: TMember },
    as: 'teamMember',
    foreignKey: {
      name: 'teamId',
      allowNull: false,
    },
  });
  User.belongsToMany(Team, {
    through: { model: TMember },
    as: 'memberTeam',
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });

  // channel : pcmemeber : user m:n
  Channel.belongsToMany(User, {
    through: { model: PCMember },
    as: 'channelMember',
    foreignKey: {
      name: 'channelId',
      allowNull: false,
    },
  });
  User.belongsToMany(Channel, {
    through: { model: PCMember },
    as: 'memberChannel',
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });

  // HOOKS

  // hash password before create
  User.beforeCreate(async function (user) {
    const salt = await genSalt(12);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
  });
}
