import "../styles/signupPage.css";

import auth from "../utils/auth.js";
import { useState, FormEvent, ChangeEvent } from "react";
import { UserLogin } from "../interfaces/userLogin.js";
import { signUp } from "../api/authAPI.js";
const Signup = () => {
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signUpData.username || !signUpData.password) {
      setError("All fields are required");
      return;
    }

    try {
      // Call the sign up API endpoint with signUpData
      const data = await signUp(signUpData);
      // If sign up is successful, call Auth.login to store the token in localStorage
      auth.login(data.token);
    } catch (err) {
      setError("Failed to sign up");
      console.error("Failed to signup", err); // Log any errors that occur during sign up
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={signUpData.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={signUpData.password || ""}
            onChange={handleChange}
          />
        </div>
        <div className="error-message" style={{ visibility: error ? 'visible' : 'hidden' }}>
  {error}
</div>
        <div className="form-footer">
          <button className="signupBtn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
