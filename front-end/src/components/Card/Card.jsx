import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3001/product");
        const data = await response.json();
        const foundProduct = data.find((product) => product._id === item._id);
        setProduct(foundProduct);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [item._id]);

  if (!product) {
    return null; // Ou algum indicador de carregamento
  }

  return (
    <Link className="link" to={`/product/${product._id}`}>
      <div className="card">
        <div className="image">
          <img
            src={product.img}
            alt={product.title}
            className="mainImg"
          />
          <img
            src={product.img2}
            alt={product.title}
            className="secondImg"
          />
        </div>
        <h2>{product.title}</h2>
        <div className="prices">
          <h3>${product.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;