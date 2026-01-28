import { useEffect, useState } from "react";
import api from "../../services/api";

const Inventory = ({ onBack }) => {
  const [branches, setBranches] = useState([]);
  const [inventory, setInventory] = useState([]);

  const loadInventory = async (branchId) => {
    const res = await api.get(`/api/inventory/${branchId}`);
    setInventory(res.data);
  };

  useEffect(() => {
    api.get("/api/branches").then(res => setBranches(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Branch Inventory</h2>

      <select onChange={e => loadInventory(e.target.value)}>
        <option>Select Branch</option>
        {branches.map(b => (
          <option key={b.branchId} value={b.branchId}>
            {b.branchName}
          </option>
        ))}
      </select>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Drink</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(i => (
            <tr key={i.inventoryId}>
              <td>{i.drink?.drinkName}</td>
              <td>{i.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default Inventory;
