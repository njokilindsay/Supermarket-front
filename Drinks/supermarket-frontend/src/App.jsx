import { useState } from "react";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Customer pages
import SelectBranch from "./pages/customer/SelectBranch";
import Drinks from "./pages/customer/Drinks";
import Checkout from "./pages/customer/Checkout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Restock from "./pages/admin/Restock";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";


function App() {
  // auth state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [showRegister, setShowRegister] = useState(false);

  if (user.role === "admin") {
  if (adminPage === "dashboard")
    return <AdminDashboard onNavigate={setAdminPage} />;

  if (adminPage === "restock")
    return <Restock onBack={() => setAdminPage("dashboard")} />;

  if (adminPage === "inventory")
    return <Inventory onBack={() => setAdminPage("dashboard")} />;

  if (adminPage === "reports")
    return <Reports onBack={() => setAdminPage("dashboard")} />;
}


  // customer flow state
  const [branch, setBranch] = useState(null);
  const [drink, setDrink] = useState(null);

  const [adminPage, setAdminPage] = useState("dashboard");

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setBranch(null);
    setDrink(null);
  };

  // NOT LOGGED IN → LOGIN / REGISTER
  if (!user) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register />
            <p style={styles.link} onClick={() => setShowRegister(false)}>
              Already have an account? Login
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setUser} />
            <p style={styles.link} onClick={() => setShowRegister(true)}>
              Don’t have an account? Register
            </p>
          </>
        )}
      </div>
    );
  }

  // LOGGED IN → CUSTOMER FLOW
  return (
    <div>
      <header style={styles.header}>
        <h3>Welcome, {user.username}</h3>
        <button onClick={logout}>Logout</button>
      </header>

      {!branch && <SelectBranch onSelect={setBranch} />}

      {branch && !drink && (
        <Drinks branch={branch} onBuy={setDrink} />
      )}

      {branch && drink && (
        <Checkout
          branch={branch}
          drink={drink}
          onDone={() => setDrink(null)}
        />
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#eee",
  },
  link: {
    textAlign: "center",
    color: "blue",
    cursor: "pointer",
  },
};

export default App;
