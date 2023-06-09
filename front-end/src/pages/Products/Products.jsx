import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss";
import axios from "axios";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});

  const location = useLocation();
  const lowestFirstRef = useRef(null);
  const highestFirstRef = useRef(null);

  useEffect(() => {
    setSelectedSubCats([]);
    setSort(null);
    setMaxPrice(3000);
  }, [catId, location]);

  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    if (lowestFirstRef.current) {
      lowestFirstRef.current.checked = false;
    }
    if (highestFirstRef.current) {
      highestFirstRef.current.checked = false;
    }
  }, [catId, location]);

  useEffect(() => {
    if (lowestFirstRef.current && highestFirstRef.current) {
      lowestFirstRef.current.checked = sort === "asc";
      highestFirstRef.current.checked = sort === "desc";
    }
  }, [sort]);

  useEffect(() => {
    setMaxPrice(3000);
  }, [catId]);
  
  let type;
  let currentProduct;

  if(catId === 1) {
    type = "Eyeglasses";
  } else if(catId === 2) {
    type = "Sunglasses";
  } else if(catId === 3) {
    type = "Accessories";
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product/", {
          params: {
            type: type,
          },
        });
        const { data } = response;
        const categoryProducts = data.filter((product) => product.type === type);
        const newCategoryMap = {};
        categoryProducts.forEach((product) => {
          if (!newCategoryMap[product.category]) {
            newCategoryMap[product.category] = [product.category];
          } else {
            newCategoryMap[product.category].push(product.category);
          }
        });
        setCategoryMap(newCategoryMap);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [type]);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
  };       

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {Object.entries(categoryMap).map(([category, ids]) => (
            <div className="inputItem" key={category}>
              <input
                type="checkbox"
                id={category}
                value={ids}
                onChange={handleChange}
              />
              <label htmlFor={category}>{category}</label>
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
          type={type}
        />
      </div>
    </div>
  );
};

export default Products;