import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const RegisterForm = ({ onFormSwitch, onFormSubmit }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isNameValid, setIsNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch();

  const validateForm = () => {
    setIsNameValid(!!name);
    setIsLastNameValid(!!lastName);
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password)

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    setIsPasswordValid((prev) => prev && passwordPattern.test(password));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (isNameValid && isLastNameValid && isEmailValid && isPasswordValid && email.trim() !== '' && password.trim() !== '' && name.trim() !== '' && lastName.trim() !== '') {
        dispatch(login());
      navigate("/profile");
    } else {
      if (!name.trim()) {
        setIsNameValid(false);
      }
      if (!lastName.trim()) {
        setIsLastNameValid(false);
      }
      if (!email.trim()) {
        setIsEmailValid(false);
      }
      if (!password.trim()) {
        setIsPasswordValid(false);
      }
    }
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className='register-form'>
          <label htmlFor="name">First Name</label>
          <input
            value={name}
            name="name"
            onChange={handleNameChange}
            id="name"
            placeholder="First Name"
            className={isNameValid ? "" : "invalid"}
          />
        </div>
        <div className='register-form'>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastName}
            name="lastName"
            onChange={handleLastNameChange}
            id="lastName"
            placeholder="Last Name"
            className={isLastNameValid ? "" : "invalid"}
          />
        </div>
        <div className='register-form'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            placeholder="youremail@example.com"
            onChange={handleEmailChange}
            className={isEmailValid ? "" : "invalid"}
          />
        </div>
        <div className='register-form'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            placeholder="************"
            onChange={handlePasswordChange}
            className={isPasswordValid ? "" : "invalid"}
          />
          {!isPasswordValid && (
          <div className="password-info">*min 8 characters (inc. min 1 number)</div>
        )}
        </div>
        <button type="submit">Register</button>
      </form>
      <h5 className="link-button" onClick={() => onFormSwitch("login")}>
        Already have an account? Login here.
      </h5>
    </div>
  );
};

export default RegisterForm;
