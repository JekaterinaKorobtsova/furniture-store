import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addItem, selectCart } from "../redux/furnitureSlice";
import { useDispatch, useSelector } from "react-redux";
import { SlCheck, SlPlus } from "react-icons/sl";

const Furniture = () => {
  const [furniture, setFurniture] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const { data } = await axios.get(`https://64633f3a7a9eead6fae1062c.mockapi.io/item/` + id);
        setFurniture(data);
      } catch (error) {
        alert("There was an issue with getting the data!");
        navigate("/");
      }
    }
    fetchFurniture();
  }, [id, navigate]);

  if (!furniture) {
    return <>Loading...</>;
  }

  const handleAddToCart = () => {
    dispatch(addItem({ id: furniture.id }));
  };
  const isItemAdded = cart.items.some((cartItem) => cartItem.id === furniture.id);

  return (
    <>
      <div className="content-container">
        <div className="furniture-container">
          <div className="carousel-container">
            <Carousel showThumbs={false} autoPlay interval={2000} infiniteLoop showStatus={false}>
              {furniture.carouselImages.map((image, index) => (
                <div key={index}>
                  <img className="carousel-image" src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="info-container">
            <h2>{furniture.name}</h2>
            <h4>{furniture.manufacturer}</h4>
            <p>{furniture.description}</p>
            <h3>Price: {furniture.price.toFixed(2)} €</h3>
            <div className="furniture-button">
              <button
                onClick={handleAddToCart}
                className={`add-button ${isItemAdded ? "disabled" : ""}`}
                disabled={isItemAdded}
              >
                {isItemAdded ? (
                  <div className="added-button">
                    <SlCheck className="added-icon" />
                    <span>Added</span>
                  </div>
                ) : (
                  <div className="add-button">
                    <SlPlus />
                    <span> Add </span>
                  </div>
                )}
              </button>
              <Link to="/catalog">
                <button className="back-button">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Furniture;
