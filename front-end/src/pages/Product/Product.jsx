import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import axios from "axios";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("image1");
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/${id}`);
        setCurrentProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
          <img src={currentProduct.product.image1} alt={currentProduct.product.title} onClick={() => handleImageClick("image1")} />
          <img src={currentProduct.product.image2} alt={currentProduct.product.title} onClick={() => handleImageClick("image2")} />
          <img src={currentProduct.product.image3} alt={currentProduct.product.title} onClick={() => handleImageClick("image3")} />
          <img src={currentProduct.product.image4} alt={currentProduct.product.title} onClick={() => handleImageClick("image4")} />
        </div>
        <div className="mainImg">
          <img src={currentProduct.product[selectedImg]} alt={currentProduct.product.title} />
        </div>
      </div>
      <div className="right">
        <h1>{currentProduct.product.title}</h1>
        <span className="price">${currentProduct.product.price}</span>
        <p>{currentProduct.product.desc}</p>
        <div className="quantity">
          <button onClick={() => setQuantity(prev => (prev === 1 ? 1 : prev - 1))}>
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity(prev => prev + 1)} disabled={quantity === currentProduct.product.stock}>
            +
          </button>
        </div>
        <div className="info">
          <span style={{ fontSize: 'larger', fontWeight: 'bold' }}>
            Available stock: {currentProduct.product.stock}
          </span>
          <span>Product Type: {currentProduct.product.type}, {currentProduct.product.category}</span>
        </div>
        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: currentProduct.product._id,
                title: currentProduct.product.title,
                desc: currentProduct.product.desc,
                price: currentProduct.product.price,
                img: currentProduct.product.image1,
                quantity,
                stock: currentProduct.product.stock,
              })
            )
          }
          disabled={currentProduct.qty === 0}
        >
          {currentProduct.qty === 0 ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default Product;