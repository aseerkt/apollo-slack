import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'team',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'teams' },
  );
}
