import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../utils/auth";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";
import toast from "react-hot-toast";

const SESSION_KEY = "kendall_manager_pro_session";
const SESSION_EXPIRY_KEY = "kendall_manager_pro_session_expiry";
const SESSION_DURATION = 1000 * 60 * 30; // 30 minutes

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string[];
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      email?: string;
      password?: string[];
      confirmPassword?: string;
    } = {};

    // Validate email
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email.";

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) newErrors.password = passwordErrors;

    // Validate confirm password
    const confirmError = validateConfirmPassword(password, confirmPassword);
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // Save user
    signup(email, password);

    // Set session token and expiry
    localStorage.setItem(SESSION_KEY, "active");
    localStorage.setItem(
      SESSION_EXPIRY_KEY,
      (Date.now() + SESSION_DURATION).toString()
    );

    toast.success("Signup successful! Redirecting to dashboard...");
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
          Kendall Manager Pro
        </h1>
        <p className="text-gray-500 text-sm">
          Create your account to get started
        </p>
      </header>

      {/* Signup Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-2">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <ul className="text-red-500 text-sm mt-1 list-disc pl-5">
                  {errors.password.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
              Sign Up
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <span className="mr-2">Already have an account?</span>
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
