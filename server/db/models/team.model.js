import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Team',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [4, 20],
            msg: 'Name must be at least 4 characters long',
          },
        },
      },
    },
    { timestamps: true, tableName: 'teams' },
  );
}
