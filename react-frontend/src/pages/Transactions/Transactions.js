import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import TransactionTable from "../../components/Transaction/TransactionTable/TransactionTable";
import Account from "../../components/account/Account";
import Footer from "../../components/footer/Footer";
import { accounts } from "../../data/accounts";
import { transactions } from "../../data/transactions";
import "./Transactions.css";

function Transactions() {
  const { accountId } = useParams();

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const currentAccount = accounts.find(
    (acc) => acc.accountId === Number(accountId)
  );

  const filteredTransactions = transactions.filter(
    (t) => t.accountId === Number(accountId)
  );

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
