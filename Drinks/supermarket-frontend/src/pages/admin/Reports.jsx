import { useEffect, useState } from "react";
import api from "../../services/api";

const Reports = ({ onBack }) => {
  const [byDrink, setByDrink] = useState([]);
  const [byBranch, setByBranch] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/api/reports/sales-by-drink").then(res => setByDrink(res.data));
    api.get("/api/reports/sales-by-branch").then(res => setByBranch(res.data));
    api.get("/api/reports/total-revenue").then(res => setTotal(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales Reports</h2>

      <h3>Sales by Drink</h3>
      <pre>{JSON.stringify(byDrink, null, 2)}</pre>

      <h3>Sales by Branch</h3>
      <pre>{JSON.stringify(byBranch, null, 2)}</pre>

      <h3>Total Revenue</h3>
      <h2>KES {total}</h2>

      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default Reports;
