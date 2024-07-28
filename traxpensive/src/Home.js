import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [receipt, setReceipt] = useState(null);
  const [date, setDate] = useState('');
  const [totalSpending, setTotalSpending] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(null);
  const [budgetInput, setBudgetInput] = useState('');

  const addExpense = () => {
    if (expenseName && expenseAmount && expenseCategory && receipt && date) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        receipt,
        date,
      };
      setExpenses([...expenses, newExpense]);
      setTotalSpending(totalSpending + newExpense.amount);
      setExpenseName('');
      setExpenseAmount('');
      setExpenseCategory('Food');
      setReceipt(null);
      setDate('');
    }
  };

  const removeExpense = (index) => {
    const expenseToRemove = expenses[index];
    setExpenses(expenses.filter((_, i) => i !== index));
    setTotalSpending(totalSpending - expenseToRemove.amount);
  };

  const setBudget = () => {
    const budgetValue = parseFloat(budgetInput);
    if (!isNaN(budgetValue)) {
      setBudgetLimit(budgetValue);
    } else {
      setBudgetLimit(null);
    }
  };

  return (
    <div className="home">
      <div className="container rounded-box" id="home">
        <h1 className="header-title">traXpensive</h1>
        <div className="input-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="number"
            id="expenseAmount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>

        <div className="input-group">
          <label htmlFor="expenseCategory">Category</label>
          <select
            id="expenseCategory"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="receipt">Upload Receipt</label>
          <input
            type="file"
            id="receipt"
            onChange={(e) => setReceipt(e.target.files[0])}
          />
        </div>

        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="button" onClick={addExpense}>Add Expense</button>
      </div>

      {expenses.length > 0 && (
        <div className="expense-list-container rounded-box">
          <ul className="expense-list">
            {expenses.map((expense, index) => (
              expense.receipt && (
                <li key={index} className="expense-item">
                  <div className="expense-details">
                    <span>{expense.name}: ${expense.amount.toFixed(2)}</span>
                    <span className="expense-category"><strong>{expense.category}</strong></span>
                    <span className="expense-date">{expense.date}</span>
                    <span className="expense-receipt">
                      {expense.receipt ? (
                        <a href={URL.createObjectURL(expense.receipt)} target="_blank" rel="noopener noreferrer">View Receipt</a>
                      ) : 'No Receipt'}
                    </span>
                  </div>
                  <button className="button-remove" onClick={() => removeExpense(index)}>Remove</button>
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      <div className="budget-section rounded-box">
        <h2>Set Your Monthly Budget</h2>
        <div className="input-group">
          <label htmlFor="budgetLimit">Budget Limit:</label>
          <input
            type="number"
            className="budget-input"
            id="budgetLimit"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Enter budget limit"
          />
        </div>
        <button className="button" onClick={setBudget}>Set Budget</button>
        <p id="budgetStatus">
          {budgetLimit !== null
            ? `Budget Limit: $${budgetLimit.toFixed(2)}`
            : 'No budget set.'}
          <br />
          Total Spending: ${totalSpending.toFixed(2)}
          {budgetLimit !== null && totalSpending > budgetLimit && (
            <span className="budget-warning">You've exceeded your budget!</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;








