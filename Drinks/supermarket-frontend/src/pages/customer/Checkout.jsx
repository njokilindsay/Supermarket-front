import { useState } from "react";
import api from "../../services/api";

const Checkout = ({ branch, drink, onDone }) => {
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePurchase = async () => {
    try {
      await api.post("/api/sales", {
        branchId: branch.branchId,
        drinkId: drink.drinkId,
        quantity,
        userId: user.username,
        phoneNumber,
      });

      alert("✅ Payment request sent to phone");
      onDone();
    } catch {
      alert("❌ Purchase failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>

      <p><strong>Branch:</strong> {branch.branchName}</p>
      <p><strong>Drink:</strong> {drink.drinkName}</p>
      <p><strong>Price:</strong> KES {drink.price}</p>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      <input
        type="text"
        placeholder="Phone Number (2547...)"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />

      <button onClick={handlePurchase}>
        Pay with M-Pesa
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
};

export default Checkout;
