import { useState } from "react";
import "./App.css";

function AddExpense({ onAddExpense }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    // Add transaction
    onAddExpense({
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      note,
    });

    // Clear fields
    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Transaction</h2>

      {/* Income/Expense toggle */}
      <div className="toggle-buttons">
        <button
          type="button"
          className={type === "income" ? "active" : ""}
          onClick={() => setType("income")}
        >
          Income
        </button>
        <button
          type="button"
          className={type === "expense" ? "active" : ""}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

      {/* Input fields */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit" className="add-button">Add</button>
    </form>
  );
}

export default AddExpense;
