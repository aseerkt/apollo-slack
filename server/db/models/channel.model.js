import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Channel',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      private: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
    { timestamps: true, tableName: 'channels' },
  );
}
