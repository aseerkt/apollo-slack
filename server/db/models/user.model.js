import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default function (sequelize) {
  sequelize.define(
    'user',
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          is: /^\w{3,}$/,
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          is: /^\w{3,}$/,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          is: /^\w{3,}$/,
        },
      },
    },
    { timestamps: true, tableName: 'users' },
  );
}
