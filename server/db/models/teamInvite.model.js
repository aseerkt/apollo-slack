export default function (sequelize) {
  sequelize.define(
    'TeamInvite',
    {},
    { timestamps: true, tableName: 'teamInvites' },
  );
}
