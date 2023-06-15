import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import db from "../../db.json";


const Card = ({ item }) => {
  //console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          <img
            src={item.img}
            alt={item.title}
            className="mainImg"
          />
          <img
            src={item.img2}
            alt={item.title}
            className="secondImg"
          />
        </div>
        <h2>{item.title}</h2>
        <div className="prices">
          <h3>${item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;