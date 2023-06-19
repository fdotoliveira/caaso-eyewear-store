import React, { useState, useRef } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import Account from "../Account/Account";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  const handleFooterClick = () => {
    const footerElement = document.getElementsByClassName('footer')[0];
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCartClick = () => {
    setOpenCart(!openCart);
    if(openAccount)
      setOpenAccount(!openAccount);
  };

  const handleAccountClick = () => {
    setOpenAccount(!openAccount);
    if(openCart)
      setOpenCart(!openCart);
  };

  const handleLoginClick = () => {

    navigate("login");
  }

  return (
    <div className="navbar">
      <div className="wrapper">

        {/* Lado esquerdo do navbar */}
        <div className="left">
          <div className="item">
            <Link className="link" to="/products/1">Eyeglasses</Link>
          </div>

          <div className="item">
            <Link className="link" to="/products/2">Sunglasses</Link>
          </div>

          <div className="item">
            <Link className="link" to="/products/3">Accessories</Link>
          </div>
        </div>

        {/* Logo/Nome da loja */}
        <div className="center">
          <Link className="link" to="/">CAASO Eyewear</Link>
        </div>

        {/* Lado direito do navbar */}
        <div className="right">

          <div className="item">
            <Link className="link" to="/">Homepage</Link>
          </div>

          <div className="item">
            <div className="clickable" onClick={handleFooterClick}>About</div>
          </div>

          <div className="item">
            <div className="clickable" onClick={handleFooterClick}>Contact</div>
          </div>

          <div className="icons">
            {/* My Account */}
            {JSON.parse(localStorage.getItem('login'))===null? 
              <div className="item">
                <div className="clickable" onClick={handleLoginClick}>Login</div>
              </div>
              
              : 

              <div className="accountIcon" onClick={handleAccountClick}>
                <PersonOutlineOutlinedIcon />
              </div>
            }

            {/* Carrinho */}
            <div className="cartIcon" onClick={handleCartClick}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>

          </div>
        </div>
      </div>
      {openCart && <Cart />}
      {openAccount && <Account isOpen={handleAccountClick}/>}
    </div>
  );
};

export default Navbar;