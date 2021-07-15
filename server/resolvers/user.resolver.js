import formatErrors from '../utils/formatErrors';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../utils/jwtHelper';
import { setTokenCookie } from '../utils/cookieHelper';

export default {
  Query: {
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
        const user = await db.User.create(args);
        return { ok: true, user };
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
