import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchFurniture, setCategoryId, selectCart } from "../redux/furnitureSlice";
import { Link } from "react-router-dom";
import { SlCheck, SlPlus } from "react-icons/sl";
import Loading from './Loading';

const FurnitureCard = () => {
  const dispatch = useDispatch();
  const { items, categoryId } = useSelector((state) => state.furniture);
  const cart = useSelector(selectCart);
  

  useEffect(() => {
    dispatch(fetchFurniture());
    dispatch(setCategoryId(0));
  }, [dispatch]);

  const handleAddToCart = useCallback(
    (itemId) => {
      const item = items.find((item) => item.id === itemId);
      if (item) {
        dispatch(addItem({ id: itemId }));
      }
    },
    [dispatch, items]
  );

  if (!items || items.length === 0) {
    return <div><Loading /></div>;
  }

  const filteredItems =
    categoryId !== 0 ? items.filter((item) => item.category === categoryId) : items;

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="furniture-card">
      {sortedItems.map((item) => {
        const isAddedToCart = cart.items.some((cartItem) => cartItem.id === item.id);
        return (
          <div className="item-container" key={item.id}>
            <Link to={`/furniture/${item.id}`}>
              <img className="furniture-card_image" src={item.image} alt="furniture" />
            </Link>
            <div className="card-info">
              <h4>{item.name}</h4>
              {item.price && typeof item.price === "number" ? (
                <h4>{item.price.toFixed(2)} €</h4>
              ) : (
                <h4>Price not available</h4>
              )}
            </div>

            <button
              className={`add-button ${isAddedToCart ? "disabled" : ""}`}
              onClick={() => handleAddToCart(item.id)}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <div className='added-button'>
                  <SlCheck />
                  <span>Added</span>
                </div>
              ) : (
                <div className='add-button'>
                  <SlPlus />
                  <span> Add </span>
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FurnitureCard;
