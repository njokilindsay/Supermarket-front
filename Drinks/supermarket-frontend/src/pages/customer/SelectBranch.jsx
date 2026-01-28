import { useEffect, useState } from "react";
import api from "../../services/api";

const SelectBranch = ({ onSelect }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/branches")
      .then(res => setBranches(res.data))
      .catch(() => alert("Failed to load branches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading branches...</p>;

  return (
    <div style={styles.container}>
      <h2>Select Branch</h2>

      {branches.map(branch => (
        <button
          key={branch.branchId}
          onClick={() => onSelect(branch)}
          style={styles.button}
        >
          {branch.branchName} – {branch.location}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "1rem",
    margin: "1rem auto",
    cursor: "pointer",
  },
};

export default SelectBranch;
