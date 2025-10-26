const TOKEN_KEY = "kendall_manager_pro_token";
const EXPIRY_KEY = "kendall_manager_pro_token_expiry";

/*Save session token with expiry time
 */
export const setSessionToken = (token: string, expiresInMinutes = 60) => {
  localStorage.setItem(TOKEN_KEY, token);
  const expiryTime = Date.now() + expiresInMinutes * 60 * 1000;
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
};

/* Get session token if still valid
 */
export const getSessionToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;
  if (Date.now() > parseInt(expiry, 10)) {
    clearSession();
    return null;
  }

  return token;
};

/* Clear session completely
 */
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};
