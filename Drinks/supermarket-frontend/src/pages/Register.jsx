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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Customer Registration</h2>

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
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
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
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
  },
};

export default Register;
