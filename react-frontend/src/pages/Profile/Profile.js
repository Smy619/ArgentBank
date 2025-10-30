import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { accounts } from "../../data/accounts";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Account from "../../components/account/Account";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import "./Profile.css";

function Profile() {
  // Get token from Redux or from local/session storage
  const reduxToken = useSelector((state) => state.auth.token);
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  // Get user information from Redux
  const reduxUser = useSelector((state) => state.auth.user);
  // Detemine which token to use (Redux first, then localStorage, then localStorage , the sessionStorage)
  const token = reduxToken || localToken || sessionToken;
  // Local state for user data and edit mode
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Used to nacigate programmatically
  const navigate = useNavigate();

  //When the Redux user changes, update local state and localStorage
  useEffect(() => {
    if (reduxUser) {
      // if user data exists in Redux, update local state and persist in localStorage
      setUser(reduxUser);
      localStorage.setItem("user", JSON.stringify(reduxUser));
    } else {
      // Otherwise, try to retrieve the user data from localStorage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [reduxUser]);
  
  // If no token is found, redirect user to home page(not authenticated)
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
