import { useEffect, useState } from "react";
import api from "../../services/api";

const Restock = ({ onBack }) => {
  const [branches, setBranches] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [drinkId, setDrinkId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    api.get("/api/branches").then((res) => setBranches(res.data));
    api.get("/api/drinks").then((res) => setDrinks(res.data));
  }, []);

  const handleRestock = async () => {
    try {
      await api.post("/api/inventory/restock", {
        branchId,
        drinkId,
        quantity,
      });
      alert("✅ Inventory restocked");
      setBranchId("");
      setDrinkId("");
      setQuantity("");
    } catch {
      alert("❌ Restock failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Restock Inventory
        </h2>

        <div className="space-y-4">
          {/* Branch Selector */}
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b.branchId} value={b.branchId}>
                {b.branchName}
              </option>
            ))}
          </select>

          {/* Drink Selector */}
          <select
            value={drinkId}
            onChange={(e) => setDrinkId(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Drink</option>
            {drinks.map((d) => (
              <option key={d.drinkId} value={d.drinkId}>
                {d.drinkName}
              </option>
            ))}
          </select>

          {/* Quantity Input */}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Restock Button */}
          <button
            onClick={handleRestock}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium
                       hover:bg-green-700 transition"
          >
            Restock
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium
                       hover:bg-gray-700 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Restock;
