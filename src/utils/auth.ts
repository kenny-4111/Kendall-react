const USER_KEY = "kendall_manager_pro_user";
const SESSION_KEY = "kendall_manager_pro_session";
const SESSION_EXPIRY_KEY = "kendall_manager_pro_session_expiry";

/* Signup: store user credentials
 */
export const signup = (email: string, password: string): void => {
  const user = { email, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/*Login: verify credentials and set session with expiry
 */
export const login = (email: string, password: string): boolean => {
  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) return false;

  const user = JSON.parse(storedUser);
  if (user.email === email && user.password === password) {
    localStorage.setItem(SESSION_KEY, "active");
    localStorage.setItem(SESSION_EXPIRY_KEY, (Date.now() + 3600000).toString());
    return true;
  }
  return false;
};

/* Logout: clear session
 */
export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EXPIRY_KEY);
};

/*Check if session is valid
 */
export const isSessionActive = (): boolean => {
  const session = localStorage.getItem(SESSION_KEY);
  const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);

  if (!session || !expiry) return false;

  const now = Date.now();
  if (now > parseInt(expiry, 10)) {
    logout();
    return false;
  }
  return true;
};
