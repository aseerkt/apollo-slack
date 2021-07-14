import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'Message',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'messages' },
  );
}
