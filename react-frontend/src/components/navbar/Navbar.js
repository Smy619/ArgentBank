import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import logo from "../../assets/img/argentBankLogo.webp";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const displayName = user.userName || "";

  return (
    <nav className="main-nav">
      <div className="main-content nav-content">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          {isAuthenticated ? (
            <>
              <div className="main-nav-right">
                <Link className="main-nav-item" to="/profile">
                  <span className="username">{displayName}</span>
                  <FontAwesomeIcon icon={faCircleUser} className="iconname" />
                </Link>
                <button className="main-nav-item">
                  <FiSettings fontSize={40} fontWeight={400} />
                </button>
                <button
                  className="main-nav-item"
                  onClick={handleLogout}
                  aria-label="Log out"
                >
                  <FontAwesomeIcon icon={faPowerOff} className="icon" />
                </button>
              </div>
            </>
          ) : (
            <Link className="main-nav-item" to="/login">
              <FontAwesomeIcon icon={faCircleUser} className="icon" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
