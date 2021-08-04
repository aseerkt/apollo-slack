import formatErrors from '../utils/formatErrors';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../utils/jwtHelper';
import { removeTokenCookie, setTokenCookie } from '../utils/cookieHelper';
import { requiresAuth } from '../utils/permissions';

export default {
  User: {
    email: function ({ id, email }, args, { userId }) {
      return id === userId ? email : '';
    },
  },
  Query: {
    me: (root, args, { userId, db }) => {
      if (!userId) return null;
      return db.User.findOne({ where: { id: userId } });
    },
  },
  Mutation: {
    async register(root, args, { db }) {
      try {
        await db.User.create(args);
        return { ok: true };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    },
    async login(root, { usernameOrEmail, password }, { db, req, res }) {
      try {
        const user = await db.User.findOne({
          where: usernameOrEmail.includes('@')
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail },
        });
        if (!user)
          return {
            ok: false,
            errors: [
              {
                path: 'usernameOrEmail',
                message: 'Incorrect username or email',
              },
            ],
          };

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
          return {
            ok: false,
            errors: [{ path: 'password', message: 'Incorrect password' }],
          };
        setTokenCookie(req, res, signRefreshToken(user.id));
        return {
          ok: true,
          user,
          accessToken: signAccessToken(user.id),
        };
      } catch (err) {
        console.log(err);
        return { ok: false, errors: formatErrors(err) };
      }
    },
    logout: requiresAuth(function (root, args, { req, res }) {
      return new Promise(function (resolve, reject) {
        removeTokenCookie(req, res);
        resolve(true);
      });
    }),
  },
};
