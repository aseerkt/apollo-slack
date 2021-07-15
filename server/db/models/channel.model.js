import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Channel',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      pulic: {
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'channels' },
  );
}
