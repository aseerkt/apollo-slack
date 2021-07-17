import formatErrors from '../utils/formatErrors';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../utils/jwtHelper';
import { setTokenCookie } from '../utils/cookieHelper';

export default {
  Query: {
    me: (root, args, { userId, db }) => {
      if (!userId) return null;
      return db.User.findOne({ where: { id: userId } });
    },
    getUser(root, { id }, { db }) {
      return db.User.findOne({ where: { id } });
    },
    allUsers(root, args, { db }) {
      return db.User.findAll();
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
  },
};
