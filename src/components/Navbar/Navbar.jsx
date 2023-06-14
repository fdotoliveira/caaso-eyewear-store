import React, { useState,useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const handleFooterClick = () => {
    const footerElement = document.getElementsByClassName('footer')[0];
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };  

  const handleCartClick = () => {
    setOpenCart(!openCart);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className ="link" to="/products/1">Eyeglasses</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/2">Sunglasses</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/3">Accessories</Link>
          </div>
        </div>
        <div className="center">
          <Link className ="link" to="/">CAASO Eyewear</Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className ="link" to="/">Homepage</Link>
          </div>
          <div className="item">
            <div className="clickable" onClick={handleFooterClick}>About</div>
          </div>
          <div className="item">
            <div className="clickable" onClick={handleFooterClick}>Contact</div>          
          </div>
          <div className="icons">
            <Link className ="link" to="/perfil/p-data"><PersonOutlineOutlinedIcon/></Link>                 
            <div className="cartIcon" onClick={handleCartClick}>
              <ShoppingCartOutlinedIcon/>
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {openCart && <Cart />}
    </div>
  );
};

export default Navbar;