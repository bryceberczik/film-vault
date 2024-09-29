import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import { UserLogin } from "../../interfaces/userLogin";
import auth from "../../utils/auth";
import { login } from "../../api/authLogin";
import Profile from "../profile/profile";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const currentPage = useLocation().pathname;
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginCheck, setLoginCheck] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginData.username || !loginData.password) {
      setError("All fields are required");
      return;
    }

    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      auth.login(data.token);
    } catch (err) {
      setError("Invalid username or password");
      console.error("Failed to login", err); // Log any errors that occur during login
    }
  };

  return (
    <div>
      <header>
        <div className="header-left">
          <Link to="/" className={currentPage === "/" ? "rest" : "rest"}>
            <h1 className="brand">Film Vault</h1>
          </Link>
          <Link
            to="/movie&tv"
            className={currentPage === "/movie&tv" ? "active" : "rest"}
          >
            <h2 className="options">Movies & TV</h2>
          </Link>
          <Link
            to="/books"
            className={currentPage === "/books" ? "active" : "rest"}
          >
            <h2 className="options">Books</h2>
          </Link>
        </div>
        <div className="header-right">
          <Link
            to="/devlogs"
            className={currentPage === "/devlogs" ? "active" : "rest"}
          >
            <h2 className="options">Devlogs</h2>
          </Link>
          <Link
            to="/search"
            className={currentPage === "/search" ? "active" : "rest"}
          >
            <FontAwesomeIcon className="search" icon={faMagnifyingGlass} />
          </Link>
          {!loginCheck ? (
            <h2 className="options" onClick={handleShow}>Log in</h2>
          ) : (
            <div onClick={handleShowCanvas}>
              <Profile />
            </div>
          )}
        </div>
      </header>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={loginData.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={loginData.password || ""}
                onChange={handleChange}
              />
            </div>
            <div
              className="error-message1"
              style={{ visibility: error ? "visible" : "hidden" }}
            >
              {error}
            </div>
            <p className="signupTab">
              Dont have an account?{" "}
              <Link onClick={handleClose} to="/signup" className="signup">
                Sign up
              </Link>
            </p>

            <div className="loginBtn-container">
              <button className="loginBtn" type="submit">
                Log in
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="custom-modal-title">My Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <Link className="canvOpt"  to="/">
              <h3 className="canvOpt">Home</h3>
            </Link>
            <Link className="canvOpt" to="/watchlist">
              <h3 className="canvOpt">Watch list</h3>
            </Link>
            <Link className="canvOpt"  to="/savedbooks">
              <h3 className="canvOpt">My books</h3>
            </Link>
            <Link className="canvOpt"  to="/settings">
              <h3 className="canvOpt">Settings</h3>
            </Link>
            <h3
              className="canvOpt"
              onClick={() => {
                auth.logout();
                navigate("/");
              }}
            >
              Log Out
            </h3>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Header;
