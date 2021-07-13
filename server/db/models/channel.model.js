import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'channel',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      pulic: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    { timestamps: true, tableName: 'channels' },
  );
}
