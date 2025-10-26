import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../utils/auth";
import { validateEmail } from "../utils/validation";
import toast from "react-hot-toast";

const SESSION_KEY = "kendall_manager_pro_session";
const SESSION_EXPIRY_KEY = "kendall_manager_pro_session_expiry";
const SESSION_DURATION = 1000 * 60 * 30; // 30 minutes

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Inline validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password.");
      return;
    }

    // Save session with expiry
    localStorage.setItem(SESSION_KEY, "active");
    localStorage.setItem(
      SESSION_EXPIRY_KEY,
      (Date.now() + SESSION_DURATION).toString()
    );

    toast.success("Login successful! Redirecting to dashboard...");

    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* App Title */}
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
          Kendall Manager Pro
        </h1>
        <p className="text-gray-500 text-sm">Welcome back to your workspace</p>
      </header>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-2">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error && error.toLowerCase().includes("email")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error && error.toLowerCase().includes("password")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
              Log In
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <span className="mr-2">Don’t have an account?</span>
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
