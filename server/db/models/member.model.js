import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Member',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      teamId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    },
    { timestamps: true, tableName: 'members' },
  );
}
