import jwt from 'jsonwebtoken';

// SIGN TOKEN

export function signAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
}

export function signRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

export function signTokens(userId) {
  return {
    accessToken: signAccessToken(userId),
    refreshToken: signRefreshToken(userId),
  };
}

// VERIFY TOKEN

export function verifyAccessToken(accessToken) {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}

export function verifyTokens(accessToken, refreshToken) {
  return {
    accessPayload: verifyAccessToken(accessToken),
    refreshPayload: verifyRefreshToken(refreshToken),
  };
}
