import { IS_PROD } from '../constants';

export const COOKIE_NAME = 'apollo-slack';

export function setTokenCookie(req, res, token) {
  // get url from cross site
  const origin = req.get('origin');
  // check if cross site request is coming from secure connection
  const isSecure = origin ? origin.startsWith('https://') : false;

  res.cookie(COOKIE_NAME, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
  });
}
