import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import TransactionTable from "../../components/Transaction/TransactionTable/TransactionTable";
import Account from "../../components/account/Account";
import Footer from "../../components/footer/Footer";
import "./Transactions.css";

function Transactions() {
  // Get the dynamic account ID from the URL
  const { accountId } = useParams();
  
  // Access Redux store states
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Get account and transaction data from Redux store
  const accounts = useSelector((state) => state.accounts.items);
  const transactions = useSelector((state) => state.transactions.items);
  
  // if no token is found -> redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  // Find the current account by ID
  const currentAccount = accounts.find(
    (acc) => acc.accountId === Number(accountId)
  );
  
  // Filter transactions belonging to this specific account
  const filteredTransactions = transactions.filter(
    (t) => t.accountId === Number(accountId)
  );
  
  //Handle case when the account ID is invalid or not found
  if (!currentAccount) {
    return (
      <>
        <Navbar />
        <main className="main">
          <div className="main-content">
            <p>Account not found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  // Render the page with account info and its transaction table
  return (
    <>
      <Navbar isLoggedIn={!!token} userName={user?.userName} />
      <main className="main">
        <div className="main-content">
          <Account
            title={currentAccount.title}
            amount={currentAccount.amount}
            description={currentAccount.description}
            showButton={false}
            showCloseIcon={true}
          />

          <TransactionTable transactions={filteredTransactions} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Transactions;
