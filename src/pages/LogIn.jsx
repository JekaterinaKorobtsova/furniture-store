import React, { useState } from "react";
import login from "../assets/img/log-in.jpg";
import LogInForm from "../components/LogInForm";
import RegisterForm from "../components/RegisterForm";
import Profile from "./Profile";

const LogIn = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [formData, setFormData] = useState(null);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          {currentForm === "login" ? (
            <LogInForm onFormSwitch={toggleForm} onFormSubmit={handleFormSubmit} />
          ) : (
            <RegisterForm onFormSwitch={toggleForm} onFormSubmit={handleFormSubmit} />
          )}
        </div>
        {formData && currentForm !== "login" && <Profile formData={formData} />}
      </div>
      <div className="login-image">
        <img src={login} alt="Furniture" />
      </div>
    </div>
  );
};

export default LogIn;
