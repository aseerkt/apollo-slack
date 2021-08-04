import { IS_PROD } from '../constants';
import { signTokens, verifyAccessToken, verifyRefreshToken } from './jwtHelper';

export const COOKIE_NAME = 'apollo-slack';

function getCookieOptions(req) {
  // get url from site
  const origin = req.get('origin');
  // check if cross site request is coming from secure connection
  const isSecure = IS_PROD && origin && origin.startsWith('https://');

  return {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
  };
}

export function setTokenCookie(req, res, token) {
  res.cookie(COOKIE_NAME, token, getCookieOptions(req));
}

export function removeTokenCookie(req, res) {
  res.clearCookie(COOKIE_NAME, getCookieOptions(req));
}

export function getCookieToken(req) {
  return req.cookies[COOKIE_NAME];
}

export function extractAndIssueTokens(req, res) {
  let userId;

  try {
    let refreshToken = getCookieToken(req);
    let accessToken =
      req.headers.authorization &&
      req.headers.authorization.split('Bearer ')[1];

    if (accessToken && refreshToken) {
      const refreshPayload = verifyRefreshToken(refreshToken);
      try {
        const accessPayload = verifyAccessToken(accessToken);
        if (accessPayload.userId === refreshPayload.userId) {
          userId = accessPayload.userId;
          // console.log({ userId });
        }
      } catch (err) {
        console.log(err.message);
        // here access token may expire
        if (err.message === 'jwt expired') {
          console.log('acTkn expired');
          const { accessToken, refreshToken } = signTokens(
            refreshPayload.userId,
          );
          setTokenCookie(req, res, refreshToken);
          res.setHeader('Access-Control-Expose-Headers', 'x-token');
          res.setHeader('x-token', accessToken);
          userId = refreshPayload.userId;
        }
      }
    }
  } catch (err) {
    // probably error related to refresh token
    console.log(err);
  }
  return {
    userId,
  };
}
