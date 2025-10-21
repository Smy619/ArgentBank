import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import {
  loginSuccess,
  setUserInfo,
} from "../../components/feature/auth/authSlice";
import { login , getProfile } from "../../utils/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState(""); //state for email input
  const [password, setPassword] = useState(""); //state for password input
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent from reload
    setLoading(true);
    try {
      const loginData = await login(email, password);
      const token = loginData.body.token;

      dispatch(loginSuccess({token}));
      localStorage.setItem("token", token);
      
      const profileData = await getProfile(token);

      dispatch(setUserInfo(profileData.body));
      localStorage.setItem("user", JSON.stringify(profileData.body));

      // navigate to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <main>
        <section className="sign-in-content">
          <FaUserCircle className="sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember me checkbox */}
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/*Should be the button below*/}
            <button type ="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
