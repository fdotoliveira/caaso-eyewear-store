import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
//import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import db from "../../db.json";


const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const currentProduct = useMemo(() => {
    const product = db.products.find((product) => product.id === parseInt(id));
    return product;
  }, [id]);

  const dispatch = useDispatch();
  /*const { data, loading, error } = useFetch(`/products/${id}?populate=*`);*/

  if(!currentProduct) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (imageKey) => {
    setSelectedImg(imageKey);
  }

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={currentProduct.img} alt={currentProduct.title} onClick={() => handleImageClick("img")} />
          <img src={currentProduct.img2} alt={currentProduct.title} onClick={() => handleImageClick("img2")} />
          <img src={currentProduct.img3} alt={currentProduct.title} onClick={() => handleImageClick("img3")} />
          <img src={currentProduct.img4} alt={currentProduct.title} onClick={() => handleImageClick("img4")} />
        </div>
        <div className="mainImg">
          <img src={currentProduct[selectedImg]} alt={currentProduct.title} />
        </div>
      </div>
      <div className="right">
        <h1>{currentProduct.title}</h1>
        <span className="price">${currentProduct.price}</span>
        <p>{currentProduct.desc}</p>
        <div className="quantity">
          <button onClick={() => setQuantity(prev => (prev === 1 ? 1 : prev - 1))}>
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity(prev => prev + 1)} disabled={quantity === currentProduct.qty}>
            +
          </button>
        </div>
        <div className="info">
          <span style={{ fontSize: 'larger', fontWeight: 'bold' }}>
            Available stock: {currentProduct.qty}
          </span>
          <span>Product Type: {currentProduct.type}</span>
        </div>
        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: currentProduct.id,
                title: currentProduct.title,
                desc: currentProduct.desc,
                price: currentProduct.price,
                img: currentProduct.img,
                quantity,
              })
            )
          }
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Product;