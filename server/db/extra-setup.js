export default function applyExtraSetup(sequelize) {
  const { team, channel, message, user } = sequelize.models;

  // team : owner
  team.belongsTo(user, { foreignKey: 'owner' });
  user.hasMany(team);

  // team : channel
  channel.belongsTo(team, { foreignKey: 'teamId' });
  team.hasMany(channel);

  // channel : message
  message.belongsTo(channel, { foreignKey: 'channelId' });
  channel.hasMany(message);

  // message : user
  message.belongsTo(user, { foreignKey: 'userId' });
  user.hasMany(message);

  // team : memeber : user
  team.belongsToMany(user, { through: 'members' });
}
