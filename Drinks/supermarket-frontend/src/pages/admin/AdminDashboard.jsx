const AdminDashboard = ({ onNavigate }) => {
  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <button onClick={() => onNavigate("restock")}>
        Restock Inventory
      </button>

      <button onClick={() => onNavigate("inventory")}>
        View Inventory
      </button>

      <button onClick={() => onNavigate("reports")}>
        View Sales Reports
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
};

export default AdminDashboard;
