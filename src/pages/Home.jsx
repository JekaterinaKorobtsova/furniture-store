import React, { useEffect } from "react";
import chair from "../assets/img/main-chair.jpg";
import table from "../assets/img/main-table.jpg";
import sofa from "../assets/img/main-sofa.jpg";
import shelve from "../assets/img/main-shelve.jpg";
import { SlDiamond, SlHeart, SlBadge } from "react-icons/sl";
import interior1 from "../assets/img/interior1.jpg";
import interior2 from "../assets/img/interior2.jpg";
import interior3 from "../assets/img/interior3.jpg";
import interior4 from "../assets/img/interior4.jpg";
import interior6 from "../assets/img/interior6.jpg";
import signature from "../assets/img/signature.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchFurniture } from "../redux/furnitureSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Home = () => {
  const { status } = useSelector((state) => state.furniture);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFurniture());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="content-container">
        <div className="main-text">
          <h1>Design Your Perfect Home with Us</h1>
          <div className="theses">
            <div className="line">
              <SlDiamond className="icon" />
              <p>Quality furniture for your perfect home</p>
            </div>
            <div className="line">
              <SlHeart className="icon" />
              <p>Stunning designs for every style</p>
            </div>
            <div className="line">
              <SlBadge className="icon" />
              <p>Safe and easy online shopping</p>
            </div>
          </div>
        </div>
        <div className="main-categories">
          <h1>Categories</h1>
          <div className="categories-container">
            <div className="categories-box chair">
              <img src={chair} alt="chair" />
              <h3 className="categorie-name">Chairs</h3>
            </div>
            <div className="categories-box table">
              <img src={table} alt="table" />
              <h3 className="categorie-name">Tables</h3>
            </div>
            <div className="categories-box sofa">
              <img src={sofa} alt="sofa" />
              <h3 className="categorie-name">Sofas</h3>
            </div>
            <div className="categories-box shelve">
              <img src={shelve} alt="shelve" />
              <h3 className="categorie-name">Shelves</h3>
            </div>
          </div>
          <div className="button-container">
            <Link to="/catalog" style={{ textDecoration: "none" }}>
              <button className="button-text">
                Go To Catalog</button>
            </Link>
          </div>

          <div className="main-about">
            <h1>About Us</h1>
            <p>
              Welcome to our furniture online shop, where you can find everything you need to create
              your dream home. We believe that the right furniture can make all the difference,
              whether you're looking to create a cozy reading nook, a stylish dining room, or a
              comfortable bedroom. At our shop, we offer a wide variety of furniture styles, from
              modern and sleek to classic and traditional, so you can find the perfect pieces to
              match your unique taste and personality. Our experienced team of designers and
              furniture experts are always here to help you with any questions you may have, and to
              offer personalized recommendations to ensure that you find exactly what you're looking
              for. With our easy-to-use website and online shopping tools, you can easily browse and
              select your favorite items from the comfort of your own home. Plus, with fast and
              reliable shipping, you can enjoy your new furniture in no time! So why wait? Start
              designing your perfect home with us today!
              <img src={signature} alt="company name" />
            </p>
          </div>

          <div className="main-interior">
            <img className="bedroom" src={interior4} alt="bedroom design" />
            <img className="minimalistic" src={interior1} alt="minimalistic design" />
            <img className="rustic" src={interior3} alt="rustic design" />
            <img className="colourful" src={interior2} alt="colourful design" />
            <img className="office" src={interior6} alt="office design" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
