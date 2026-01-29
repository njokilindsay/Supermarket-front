import { useEffect, useState } from "react";
import api from "../../services/api";

const Reports = ({ onBack }) => {
  const [byDrink, setByDrink] = useState([]);
  const [byBranch, setByBranch] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/api/reports/sales-by-drink").then((res) => setByDrink(res.data));
    api.get("/api/reports/sales-by-branch").then((res) => setByBranch(res.data));
    api.get("/api/reports/total-revenue").then((res) => setTotal(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-teal-100 p-6 flex flex-col items-center">
      {/* Supermarket Name & Tagline */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">FreshDrinks Supermarket</h1>
        <p className="text-gray-600 mt-2">
          Your one-stop choice for refreshing drinks
        </p>
      </div>

      {/* Reports Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sales Reports
        </h2>

        {/* Total Revenue */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">KES {total}</p>
        </div>

        {/* Sales by Drink */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales by Drink</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-gray-700">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Drink</th>
                  <th className="px-4 py-2 text-left">Quantity Sold</th>
                  <th className="px-4 py-2 text-left">Revenue (KES)</th>
                </tr>
              </thead>
              <tbody>
                {byDrink.map((item, idx) => (
                  <tr
                    key={idx}
                    className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{item.drinkName}</td>
                    <td className="px-4 py-2">{item.quantitySold}</td>
                    <td className="px-4 py-2">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales by Branch */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales by Branch</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-gray-700">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Branch</th>
                  <th className="px-4 py-2 text-left">Quantity Sold</th>
                  <th className="px-4 py-2 text-left">Revenue (KES)</th>
                </tr>
              </thead>
              <tbody>
                {byBranch.map((item, idx) => (
                  <tr
                    key={idx}
                    className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{item.branchName}</td>
                    <td className="px-4 py-2">{item.quantitySold}</td>
                    <td className="px-4 py-2">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
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

export default Reports;
