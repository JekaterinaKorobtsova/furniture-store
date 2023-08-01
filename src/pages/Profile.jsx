import React, { useState } from "react";
import profile from "../assets/img/profile2.jpg";
import { Link } from "react-router-dom";
import {SlLogout} from 'react-icons/sl'
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Profile = ({ formData }) => {
  const [activeTab, setActiveTab] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const handleLogOut = () => {
      dispatch(logout());
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowWelcome(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setLastName("");
    setEmail("");

    setAddress("");
    setPostalCode("");
    setCity("");
    setCountry("");
    setPhone("");
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h2>Your Profile</h2>
        <ul>
          <li onClick={() => handleTabClick("details")}>Details</li>
          <li onClick={() => handleTabClick("orders")}>Orders</li>
          <Link to='/'>
          <li className="logout-link" onClick={handleLogOut}>
            <SlLogout/> Log Out
          </li>
          </Link>
        </ul>
      </div>
      <div className="profile-content">
        <img src={profile} alt="profile" />
        {showWelcome && <div className="greeting">Welcome to Profile Page!</div>}
        {activeTab === "details" && (
          <div>
            <h2>Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="details-form">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="details-form">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <div className="details-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com"
                />
              </div>
              <div className="details-form">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="details-form">
                <label htmlFor="postalCode">Zip/Postal Code:</label>
                <input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Zip/Postal Code"
                />
              </div>
              <div className="details-form">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="details-form">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </div>
              <div className="details-form">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {activeTab === "orders" && (
          <div className="order-tab">
            <h2>Orders</h2>
            <p>Your Orders: You haven't placed any orders yet. Feel free to explore our products and make your first purchase!</p>
          </div>
        )}
        {activeTab === "logout" && <div></div>}
      </div>
    </div>
  );
};

export default Profile;
