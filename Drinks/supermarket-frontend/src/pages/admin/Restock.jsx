import { useEffect, useState } from "react";
import api from "../../services/api";

const Restock = ({ onBack }) => {
  const [branches, setBranches] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [drinkId, setDrinkId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    api.get("/api/branches").then(res => setBranches(res.data));
    api.get("/api/drinks").then(res => setDrinks(res.data));
  }, []);

  const handleRestock = async () => {
    try {
      await api.post("/api/inventory/restock", {
        branchId,
        drinkId,
        quantity,
      });
      alert("✅ Inventory restocked");
    } catch {
      alert("❌ Restock failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Restock Inventory</h2>

      <select onChange={e => setBranchId(e.target.value)}>
        <option>Select Branch</option>
        {branches.map(b => (
          <option key={b.branchId} value={b.branchId}>
            {b.branchName}
          </option>
        ))}
      </select>

      <select onChange={e => setDrinkId(e.target.value)}>
        <option>Select Drink</option>
        {drinks.map(d => (
          <option key={d.drinkId} value={d.drinkId}>
            {d.drinkName}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={handleRestock}>Restock</button>
      <br /><br />
      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default Restock;
