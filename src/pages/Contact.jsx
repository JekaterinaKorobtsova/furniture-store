import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/Map/Map";
import { fetchFurniture, selectStatus } from "../redux/furnitureSlice";
import Loading from '../components/Loading';

const Contact = () => {
  const status = useSelector(selectStatus);
  const [isMessageSent, setMessageSent] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    nameUnfilled: false,
    emailUnfilled: false,
    messageUnfilled: false,
  });
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchFurniture())
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    event.target.classList.remove("unfilled");
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const isNameFilled = formValues.name.trim() !== "";
    const isEmailFilled = formValues.email.trim() !== "";
    const isMessageFilled = formValues.message.trim() !== "";

    setFormValues((prevValues) => ({
      ...prevValues,
      nameUnfilled: !isNameFilled,
      emailUnfilled: !isEmailFilled,
      messageUnfilled: !isMessageFilled,
    }));

    if (isNameFilled && isEmailFilled && isMessageFilled) {
      setMessageSent(true);
    }
  };

  return (
    <>
      <div className="contact-container">
        <div className="map-container">
          <Map />
        </div>
        <div className="text-component">
          <div className="contact-detailes">
            <h3>Contact Info</h3>
            <div className="contact-row">
              <span>Address:</span>
              <p>Kalamaja, Tallinn, Estonia</p>
            </div>
            <div className="contact-row">
              <span>Phone:</span>
              <p>+372 666499977</p>
            </div>
            <div className="contact-row">
              <span>Email:</span>
              <p>info@furniture.com</p>
            </div>
          </div>
          <div className="contact-form">
            <h3>Get in Touch with Us</h3>
            <p>
              Need help? Contact us! Fill out the form below, and our team will assist you. We're
              here to answer your questions and provide a seamless furniture shopping experience.
            </p>
            {isMessageSent ? (
              <h3 className="after-submit-text">Thank you for contacting us! We will get back to you soon.</h3>
            ) : (
              <>
                <form>
                  <label htmlFor="name">Your name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className={formValues.nameUnfilled ? "unfilled" : ""}
                  />

                  <label htmlFor="email">Your Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className={formValues.emailUnfilled ? "unfilled" : ""}
                  />

                  <label htmlFor="message">Your message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    className={formValues.messageUnfilled ? "unfilled" : ""}
                  />
                </form>
                <button className="submit-button" onClick={handleButtonClick}>
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
