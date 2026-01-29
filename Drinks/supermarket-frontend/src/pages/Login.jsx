import { useState } from "react";
import api from "../services/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          role: response.data?.role || "customer",
        })
      );

      onLogin({
        username,
        role: response.data?.role || "customer",
      });

      alert("✅ Login successful");
    } catch (err) {
      setError(
        err.response?.data?.error || "❌ Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-100 px-4">
      {/* Supermarket Name & Tagline */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          FreshDrinks Supermarket
        </h1>
        <p className="text-gray-600 mt-2">
          Your one-stop choice for refreshing drinks
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;

