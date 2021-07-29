import { DataTypes } from 'sequelize';

export default function (sequelize) {
  sequelize.define(
    'PCMember',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      channelId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'pcmembers' },
  );
}
