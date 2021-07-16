const LOCAL_STORAGE_ACCESS_TOKEN_NAME = 'apollo-slack-token';

export function saveAccessToken(accessToken) {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
}

export function removeAccessToken() {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
}
