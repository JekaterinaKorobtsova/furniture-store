import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearItems } from "../redux/furnitureSlice";

const Order = () => {
  const [isCardNumberValid, setCardNumberValid] = useState(true);
  const [isExpireDateValid, setExpireDateValid] = useState(true);
  const [expireDate, setExpireDate] = useState("");
  const [isCVVValid, setCVVValid] = useState(true);
  const [isFormValid, setFormValid] = useState(true);
  const [isPayClicked, setIsPayClicked] = useState(false);

  const [formValues, setFormValues] = useState({
    cardNumber: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cvv: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCart = () => {
    dispatch(clearItems());
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    const isAllFieldsFilled = Object.values(formValues).every((value) => value !== "");

    setCardNumberValid(formValues.cardNumber.length === 19);
    setCVVValid(formValues.cvv.length === 3);

    const isPersonalInfoValid =
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.email !== "" &&
      formValues.phoneNumber !== "";

    setFormValid(
      formValues.cardNumber.length === 19 &&
        isExpireDateValid &&
        formValues.cvv.length === 3 &&
        isAllFieldsFilled &&
        isPersonalInfoValid
    );

    setIsPayClicked(true);

    if (
      formValues.cardNumber.length === 19 &&
      isExpireDateValid &&
      formValues.cvv.length === 3 &&
      isAllFieldsFilled &&
      isPersonalInfoValid
    ) {
      clearCart();
      navigate("/order");
    }
  };

  const handleExpireDateChange = (e) => {
    let inputDate = e.target.value;
    inputDate = inputDate.replace(/[^0-9]/g, "").slice(0, 4);

    if (inputDate.length >= 2) {
      const month = inputDate.slice(0, 2);
      const year = inputDate.slice(2);
      inputDate = `${month}/${year}`;
    }

    const currentDate = new Date();
    const [inputMonth, inputYear] = inputDate.split("/").map((part) => parseInt(part.trim(), 10));
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const isMonthValid = inputMonth >= currentMonth && inputMonth <= 12;
    const isYearValid =
      inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
    const isExpireDateValid = isMonthValid && isYearValid;

    setExpireDateValid(isExpireDateValid);
    setExpireDate(inputDate);
  };

  const handleCardNumberChange = (e) => {
    let cardNumber = e.target.value;
    cardNumber = cardNumber.replace(/\D/g, "");
    cardNumber = cardNumber.slice(0, 16);

    let formattedCardNumber = "";
    for (let i = 0; i < cardNumber.length; i += 4) {
      formattedCardNumber += cardNumber.slice(i, i + 4) + " ";
    }
    formattedCardNumber = formattedCardNumber.trim();

    const isCardNumberValid = formattedCardNumber.length === 19;

    setFormValues({
      ...formValues,
      cardNumber: formattedCardNumber,
    });

    setCardNumberValid(isCardNumberValid);
  };

  const handleCVVChange = (e) => {
    let cvv = e.target.value;
    cvv = cvv.replace(/\D/g, "");
    cvv = cvv.slice(0, 3);
    const isValidCVV = /^\d{3}$/.test(cvv);

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      cvv: cvv,
    }));

    setCVVValid(isValidCVV);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target || {};
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value || "",
    }));
  };

  return (
    <div className="order-container">
      <div className="payment-container">
        <h4>Payment Details</h4>
        <form>
          <div
            className={`long-card-input ${
              isPayClicked && !isCardNumberValid ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="Card Number"
              name="cardNumber"
              value={formValues.cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div
            className={`long-card-input ${
              isPayClicked && !formValues.fullName ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="Full Name"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="card-row">
            <div
              className={`short-card-input ${
                isPayClicked && (!isExpireDateValid || !expireDate) ? "invalid-input" : ""
              }`}
            >
              <input placeholder="MM/YY" value={expireDate} onChange={handleExpireDateChange} />
            </div>
            <div
              className={`short-card-input ${isPayClicked && !isCVVValid ? "invalid-input" : ""}`}
            >
              <input placeholder="CVV" value={formValues.cvv} onChange={handleCVVChange} />
            </div>
          </div>
        </form>
      </div>
      <div className="personal-information-container">
        <h4>Personal Information</h4>
        <form>
          <div
            className={`long-card-input ${
              !formValues.firstName && isPayClicked ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`long-card-input ${
              !formValues.lastName && isPayClicked ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`long-card-input ${
              !formValues.email && isPayClicked ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`long-card-input ${
              !formValues.phoneNumber && isPayClicked ? "invalid-input" : ""
            }`}
          >
            <input
              placeholder="Phone number"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <Link to="/order">
          <button
            className={`checkout-button ${!isFormValid ? "invalid-button" : ""}`}
            onClick={handlePayClick}
          >
            Pay
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Order;
