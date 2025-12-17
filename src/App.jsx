import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  // Add Transaction
  const addTransaction = () => {
    if (!amount || !category) return; // basic validation
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      note,
    };
    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setCategory("");
    setNote("");
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Calculate Balance
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <div className="form-container">
        <h2>Add Transaction</h2>

        {/* Toggle buttons for Income/Expense */}
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

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="add-button" onClick={addTransaction}>
          Add
        </button>
      </div>

      <div className="balance-container">
        <h3>Balance: ₹{balance}</h3>
        <p>
          <span className="income">Income: ₹{incomeTotal}</span> |{" "}
          <span className="expense">Expense: ₹{expenseTotal}</span>
        </p>
      </div>

      <ul className="transactions">
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            <div>
              {t.category} {t.note && `(${t.note})`}
            </div>
            <div>
              ₹{t.amount}{" "}
              <button
                style={{
                  marginLeft: "10px",
                  color: "#fff",
                  background: "#ff4c4c",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
                onClick={() => deleteTransaction(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
