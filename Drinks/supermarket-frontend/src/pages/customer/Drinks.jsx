import { useEffect, useState } from "react";
import api from "../../services/api";

const Drinks = ({ branch, onBuy }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    api.get("/api/drinks")
      .then(res => setDrinks(res.data))
      .catch(() => alert("Failed to load drinks"));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Drinks – {branch.branchName}</h2>

      {drinks.map(drink => (
        <div key={drink.drinkId} style={styles.card}>
          <h3>{drink.drinkName}</h3>
          <p>Price: KES {drink.price}</p>

          <button onClick={() => onBuy(drink)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    marginBottom: "1rem",
  },
};

export default Drinks;
