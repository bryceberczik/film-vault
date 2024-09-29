import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import { UserLogin } from "../../interfaces/userLogin";
import auth from "../../utils/auth";
import { login } from "../../api/authLogin";

const Header = () => {
  const currentPage = useLocation().pathname;
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
        ...loginData,
        [name]: value
    });
};

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };


  return (
    <div>
      <header>
        <div className="header-left">
          <Link to='/' className={currentPage === "/" ? "rest" : "rest"}><h1 className="brand">Film Vault</h1></Link>
          <Link to='/movie&tv' className={currentPage === "/movie&tv" ? "active" : "rest"}><h2 className="options">Movies & TV</h2></Link>
          <Link to='/books' className={currentPage === "/books" ? "active" : "rest"}><h2 className="options">Books</h2></Link>
        </div>
        <div className="header-right">
          <Link to='/devlogs' className={currentPage === "/devlogs" ? "active" : "rest"}><h2 className="options">Devlogs</h2></Link>
          <Link to='/search' className={currentPage === "/search" ? "active" : "rest"}><FontAwesomeIcon className="search" icon={faMagnifyingGlass} /></Link>
          <h2 className="options" onClick={handleShow}>Log in</h2>
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
              <input type="text" className="form-control" name="username" placeholder="Enter username" value={loginData.username || ''} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Enter password" value={loginData.password || ''} onChange={handleChange} />
            </div> 
            <p className="signupTab">Dont have an account? <Link onClick={handleClose} to='/signup'>Sign up</Link></p>

            <div className="loginBtn-container">
              <button className="loginBtn" type="submit">Log in</button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;