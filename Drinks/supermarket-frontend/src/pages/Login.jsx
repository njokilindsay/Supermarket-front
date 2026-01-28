import { useState } from "react";
import api from "../services/api";

const Login = ({onLogin}) => {
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

      // Save user session (simple demo version)
      localStorage.setItem("user", JSON.stringify({
        username,
        role: response.data?.role || "customer",
      }));

      onLogin({
  username,
  role: response.data?.role || "customer",
});

      alert("✅ Login successful");
      // Later we’ll redirect based on role
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "❌ Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f4",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.6rem",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    marginTop: "1rem",
    color: "red",
    textAlign: "center",
  },
};

export default Login;
