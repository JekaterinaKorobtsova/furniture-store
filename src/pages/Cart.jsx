import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearItems, fetchFurniture, minusItem, removeItem, selectStatus } from "../redux/furnitureSlice";
import { SlMinus, SlPlus, SlClose } from "react-icons/sl";
import {MdOutlineDeleteForever} from 'react-icons/md';
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Order from "../components/Order";
import Loading from "../components/Loading";

const Cart = () => {
  const items = useSelector((state) => state.furniture.cart.items);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [showOrder, setShoeOrder] = useState(false);

  useEffect (() => {
    dispatch(fetchFurniture())
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />
  };

  const onClickClear = () => {
    if (window.confirm("Do you want to remove all items from the cart?")) {
      dispatch(clearItems());
    }
  };

  const handleMinus = (itemId) => {
    dispatch(minusItem(itemId));
  };

  const handlePlus = (itemId) => {
    dispatch(addItem({ id: itemId }));
  };

  const handleRemove = (itemId) => {
    if (window.confirm("Are You sure want to remove?")) {
      dispatch(removeItem(itemId));
    }
  };

  const handlePayClick = () => {
      setShoeOrder(true);
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <svg className="empty-cart-svg" width="170px" height="170px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M2.08368 2.7512C2.22106 2.36044 2.64921 2.15503 3.03998 2.29242L3.34138 2.39838C3.95791 2.61511 4.48154 2.79919 4.89363 3.00139C5.33426 3.21759 5.71211 3.48393 5.99629 3.89979C6.27827 4.31243 6.39468 4.76515 6.44841 5.26153C6.47247 5.48373 6.48515 5.72967 6.49184 6H17.1301C18.815 6 20.3318 6 20.7757 6.57708C21.2197 7.15417 21.0461 8.02369 20.699 9.76275L20.1992 12.1875C19.8841 13.7164 19.7266 14.4808 19.1748 14.9304C18.6231 15.38 17.8426 15.38 16.2816 15.38H10.9787C8.18979 15.38 6.79534 15.38 5.92894 14.4662C5.06254 13.5523 4.9993 12.5816 4.9993 9.64L4.9993 7.03832C4.9993 6.29837 4.99828 5.80316 4.95712 5.42295C4.91779 5.0596 4.84809 4.87818 4.75783 4.74609C4.66977 4.61723 4.5361 4.4968 4.23288 4.34802C3.91003 4.18961 3.47128 4.03406 2.80367 3.79934L2.54246 3.7075C2.1517 3.57012 1.94629 3.14197 2.08368 2.7512Z" fill="#768FA6"></path> <path d="M12.0303 8.96967C11.7374 8.67678 11.2626 8.67678 10.9697 8.96967C10.6768 9.26256 10.6768 9.73744 10.9697 10.0303L11.9393 11L10.9697 11.9697C10.6768 12.2626 10.6768 12.7374 10.9697 13.0303C11.2626 13.3232 11.7374 13.3232 12.0303 13.0303L13 12.0607L13.9697 13.0303C14.2626 13.3232 14.7374 13.3232 15.0303 13.0303C15.3232 12.7374 15.3232 12.2626 15.0303 11.9697L14.0607 11L15.0303 10.0303C15.3232 9.73744 15.3232 9.26256 15.0303 8.96967C14.7374 8.67678 14.2626 8.67678 13.9697 8.96967L13 9.93934L12.0303 8.96967Z" fill="#768FA6"></path> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#768FA6"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="#768FA6"></path> </g></svg>
        <h2>Your Cart Is Currently Empty!</h2>
        <p>Before proceed to checkout you must add some products to Your shopping cart.</p>
        <p>You will find a lot of interesting products on our "Catalog" page.</p>
        <Link to="/catalog">
          <button className="empty-cart-button">Return to Catalog</button>
        </Link>
      </div>
    );
  }

  const cartTotalPrice = items.reduce((total, item) => total + (item.price * item.count || 0), 0);
  const vatPrice = cartTotalPrice * 0.2;
  const formatPrice = (price) => {
    const parts = price.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const decimalPart = parts[1];
    return `${integerPart},${decimalPart}`;
  };

  const formattedPrice = formatPrice(cartTotalPrice);
  const formattedVatPrice = formatPrice(vatPrice);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <Link to="/catalog">
        <h5>
          <BsArrowLeft /> Continue Shopping
        </h5>
      </Link>
      <div className="cart-content">
        <div className="cart-table">
          <div className="table-row table-header">
            <div className="table-cell"></div>
            <div className="table-cell">Name</div>
            <div className="table-cell">Price</div>
            <div className="table-cell">Count</div>
            <div className="table-cell">Total Price</div>
            <div className="table-cell">
              <MdOutlineDeleteForever className="remove-icon" onClick={onClickClear} alt='delete all'/>
            </div>
          </div>
          {items.map((item) => (
            <div className="table-row" key={item.id} item={item}>
              <div className="table-cell">
                <img className="cart-image" src={item.image} alt={item.name} />
              </div>
              <div className="table-cell">
                <div>{item.name}</div>
                <div className="table-manufacturer">{item.manufacturer}</div>
              </div>
              <div className="table-cell">{item.price.toFixed(2)}</div>
              <div className="table-cell cart-count">
                {item.count > 1 ? (
                  <SlMinus className="count-icon" onClick={() => handleMinus(item.id)} />
                ) : (
                  <SlMinus className="count-icon disabled" />
                )}
                {item.count}
                <SlPlus className="count-icon" onClick={() => handlePlus(item.id)} />
              </div>
              <div className="table-cell">{(item.price * item.count).toFixed(2)}</div>
              <div className="table-cell">
                <SlClose className="delete-icon" onClick={() => handleRemove(item.id)} />
              </div>
            </div>
          ))}
        </div>

        <div className="total-price-table">
            <div className="total-cell">
              <p className="total-name">Subtotal(incl. VAT): </p>
              <div className="total-sum">{formattedPrice} €</div>
            </div>
            <div className="total-cell">
              <p className="total-name">VAT 20%:</p>
              <div className="total-sum">{formattedVatPrice} €</div>
            </div>
            <div className="total-cell total-price">
              <h3 className="total-name">TOTAL: </h3>
              <h3 className="total-sum">{formattedPrice} €</h3>
            </div>
            {!showOrder ? (
            <button className="checkout-button" onClick={handlePayClick}>
              Pay
            </button>
          ) : (
            <Order />
          )}
          </div>
      </div>
    </div>
  );
};

export default Cart;
