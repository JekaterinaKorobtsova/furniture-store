import { Routes, Route } from "react-router";
import "./assets/scss/App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Catalog } from "./pages/Catalog";
import Contact from "./pages/Contact";
import Furniture from "./pages/Furniture";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import { OrderComplited } from "./pages/OrderComplited";
import ErrorPage from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="furniture/:id" element={<Furniture />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<LogIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order" element={<OrderComplited />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
