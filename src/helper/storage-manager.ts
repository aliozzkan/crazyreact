const tokenName = "siemens";

export function setToken(token: string) {
  localStorage.setItem(tokenName, token);
}

export function setUserAndToken(token: string, user: any) {
  localStorage.setItem(tokenName, JSON.stringify({ token, user }));
}

export function setAuth(token: string, user: any, project: any) {
  localStorage.setItem(tokenName, JSON.stringify({token, user, project}));
}

export function getToken() {
  return localStorage.getItem(tokenName);
}

export function getUserAndToken(): { token: string; user: any } | null {
  const item = localStorage.getItem(tokenName);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function getAuthInfo() {
  const item = localStorage.getItem(tokenName);
  if(item) {
    return JSON.parse(item);
  }
  return undefined;
}

export function clearToken() {
  return localStorage.removeItem(tokenName);
}
