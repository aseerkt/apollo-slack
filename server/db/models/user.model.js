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
          is: {
            args: /^\w{3,}$/,
            msg: 'Username must be at least 3 characters, and only use letters, numbers and underscores',
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          isEmail: { msg: 'Email is invalid' },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          min: {
            args: 6,
            msg: 'Password must be at least 6 characters long',
          },
        },
      },
    },
    { timestamps: true, tableName: 'users' },
  );
}
