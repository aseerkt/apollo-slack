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
      private: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'channels' },
  );
}
