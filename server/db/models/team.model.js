import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Team',
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
