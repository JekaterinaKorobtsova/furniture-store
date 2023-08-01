import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SlBag, SlLogin, SlUserFollowing } from "react-icons/sl";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../redux/furnitureSlice";

const Header = () => {
  const location = useLocation();
  const cartItemCount = useSelector(selectCartItemCount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className={location.pathname === "/catalog" ? "active" : ""}>
              Catalog
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="profile-icons">
        <Link to="/cart" className="cart-icon">
          <SlBag className="header-icon" />
        </Link>
        {cartItemCount > 0 && (
          <div className="cart-icon-count">
            <span>{cartItemCount}</span>
          </div>
        )}
        {isLoggedIn ? (
          <Link to="/profile">
            <SlUserFollowing className="header-icon" />
          </Link>
        ) : (
          <Link to="/login">
            <SlLogin className="header-icon" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
