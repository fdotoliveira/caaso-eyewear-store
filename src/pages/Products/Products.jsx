import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss";
import db from "../../db.json";


const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const categoryMap = {};

  let category;

  if(catId == 1) {
    category = "Eyeglasses";
  } else if(catId == 2) {
    category = "Sunglasses";
  } else {
    category = "Accessories";
  }
  
  const currentProduct = db.products.filter((product) => product.type === category);

  currentProduct.forEach((product) => {
    if (!categoryMap[product.categorie]) {
      categoryMap[product.categorie] = [product.id];
    } else {
      categoryMap[product.categorie].push(product.id);
    }
  });  

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };


  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {Object.entries(categoryMap).map(([categorie, ids]) => (
            <div className="inputItem" key={categorie}>
              <input
                type="checkbox"
                id={categorie}
                value={ids}
                onChange={handleChange}
              />
              <label htmlFor={categorie}>{categorie}</label>
            </div>
            ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={3000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List
          subCats={selectedSubCats}
          maxPrice={maxPrice}
          sort={sort}
          catId={currentProduct}
          type={category}
        />
      </div>
    </div>
  );
};

export default Products;