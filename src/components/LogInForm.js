import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../redux/authSlice';

const LogInForm = ({onFormSwitch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    setIsPasswordValid((prev) => prev && passwordPattern.test(password));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (isEmailValid && isPasswordValid && email.trim() !== '' && password.trim() !== '') {
      dispatch(login());
      navigate('/profile');
    } else {
      if (!email.trim()) {
        setIsEmailValid(false);
      }
      if (!password.trim()) {
        setIsPasswordValid(false);
      }
    }
  };

  return (
    <div className="login-form-container">
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='login-form'>
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
        <div className='login-form'>
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
        </div>
        <button type='submit'> Log In</button>
      </form>
      <h5 className='link-button' onClick={() => onFormSwitch('register')}>
        Don't have an account? Register here.
        </h5>
    </div>
  );
}

export default LogInForm;
