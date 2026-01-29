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
    api.get("/api/branches").then((res) => setBranches(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Branch Inventory
        </h2>

        {/* Branch selector */}
        <div className="mb-6">
          <select
            onChange={(e) => loadInventory(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>Select Branch</option>
            {branches.map((b) => (
              <option key={b.branchId} value={b.branchId}>
                {b.branchName}
              </option>
            ))}
          </select>
        </div>

        {/* Inventory table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 text-left">Drink</th>
                <th className="px-4 py-2 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr
                  key={i.inventoryId}
                  className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{i.drink?.drinkName}</td>
                  <td className="px-4 py-2">{i.stockQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back button */}
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

export default Inventory;
