export default function (sequelize) {
  sequelize.define('Member', {}, { timestamps: true, tableName: 'members' });
}
