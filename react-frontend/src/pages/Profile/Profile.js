import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { accounts } from "../../data/accounts";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Account from "../../components/account/Account";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import "./Profile.css";

function Profile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar isLoggedIn={!!token} userName={user?.userName} />
      <main>
        <div className="main-content">
          <div className="header">
            {isEditing ? (
              <EditUserForm onCancel={() => setIsEditing(false)} />
            ) : (
              <>
                <h1>
                  Welcome back
                  <br />
                  {user?.firstName} {user?.lastName}
                  {user?.userName && ` (${user.userName})`}!
                </h1>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Name
                </button>
              </>
            )}
          </div>

          {/* Account Section */}
          <h2 className="sr-only">Accounts</h2>
          {accounts.map((account) => (
            <div
              key={account.accountId}
              onClick={() => navigate(`/transactions/${account.accountId}`)}
              style={{ cursor: "pointer" }}
            >
              <Account
                title={account.title}
                amount={account.amount}
                description={account.description}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
