import React from "react";
import TransactionRow from "../TransactionRow/TransactionRow";
import "./TransactionTable.css";

function TransactionTable({ transactions = [] }) {
  return (
    <div className="transaction-table">
      <header className="transaction-header">
        <span>Date</span>
        <span>Description</span>
        <span>Amount</span>
        <span>Balance</span>
        <span className="arrow"></span>
      </header>

      <div className="transaction-body">
        {(Array.isArray(transactions) ? transactions : []).map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
}

export default TransactionTable;
