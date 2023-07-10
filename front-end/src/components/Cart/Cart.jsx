import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  return (
  <div className="cart">
    {products.length > 0 ? (
      <>
        <h1>Products in your cart</h1>
        {products.map((item) => (
          <div className="item" key={item._id}>
            <img src={item.img} alt="" />
            <div className="details">
              <h1>{item.title}</h1>
              <p>{item.desc?.substring(0, 70)}</p>
              <div className="price">
                {item.quantity} x ${item.price}
              </div>
            </div>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        ))}
        <div className="total">
          <span>SUBTOTAL</span>
          <span>${totalPrice()}</span>
        </div>
        {JSON.parse(localStorage.getItem('login'))===null?

          <Link to={"login"}>
            <button>CHECKOUT</button>
          </Link>

          :

          <Link to={"payment"}>
            <button>CHECKOUT</button>
          </Link>
        }
        <span className="reset" onClick={() => dispatch(resetCart())}>
          Reset Cart
        </span>
      </>
    ) : (
      <div className="empty-cart">
        <p>YOU DON'T HAVE ANY ITEMS IN YOUR CART.</p>
      </div>
    )}
  </div>
  );
};

export default Cart;