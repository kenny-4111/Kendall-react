export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/*Validates password strength.
 */
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("At least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("One uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("One lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("One number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("One special character");
  }

  return errors;
};

/* Validates confirm password matches the original.
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
};

export const validateTicket = (
  title: string,
  status: string
): string | null => {
  if (!title.trim()) return "Title is required.";
  if (!["open", "in_progress", "closed"].includes(status))
    return "Invalid status value.";
  return null;
};
