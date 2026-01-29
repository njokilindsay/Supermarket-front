import { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/create-default-user", {
        username,
        password,
      });

      setMessage("✅ Registration successful. You can now log in.");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "❌ Registration failed. Try another username."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-teal-100 px-4">
      {/* Supermarket Name & Tagline */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          FreshDrinks Supermarket
        </h1>
        <p className="text-gray-600 mt-2">
          Your one-stop choice for refreshing drinks
        </p>
      </div>

      {/* Registration Form */}
      <form className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Customer Registration
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;

