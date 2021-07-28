import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Member',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      teamId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      role: {
        type: DataTypes.ENUM('MEMBER', 'OWNER'),
        allowNull: false,
        defaultValue: 'MEMBER',
      },
    },
    { timestamps: true, tableName: 'members' },
  );
}
