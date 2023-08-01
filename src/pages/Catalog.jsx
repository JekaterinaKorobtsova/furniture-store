import React, { useCallback, useEffect, useState } from "react";
import FurnitureCard from "../components/FurnitureCard";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/furnitureSlice";

export const categories = ["All furniture", "Chairs", "Tables", "Sofas", "Shelves"];

export const Catalog = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(0);

  const onChangeCategory = useCallback(
    (index) => {
      dispatch(setCategoryId(index));
      setActiveButton(index);
    },
    [dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content-container">
        <div className="categories-container">
          <div className="categories-sort">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => onChangeCategory(index)}
                className={activeButton === index ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
          <FurnitureCard />
        </div>
      </div>
    </>
  );
};
