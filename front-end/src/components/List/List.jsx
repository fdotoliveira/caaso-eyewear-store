import React from "react";
import { useMemo, useState, useEffect } from "react";
import "./List.scss";
import Card from "../Card/Card";
import axios from "axios";

const List = ({ subCats, maxPrice, sort, catId, type}) => { 
  const [products, setProducts] = useState([]);
  const combinedIds = subCats.join(",");
  const individualIds = combinedIds.split(",");
  const transformedSubCats = subCats
    .flatMap((cat) => cat.split(",")) // separa os tipos por vírgula
    .map((cat) => cat.trim()) // remove os espaços em branco em torno dos tipos
    .filter((cat, index, self) => self.indexOf(cat) === index); // filtra apenas os tipos únicos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/`, {
          params: {
            type,
            maxPrice,
            category: subCats, // Use transformedSubCats instead of subCats
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [transformedSubCats, maxPrice, type]);

  const filteredProducts = useMemo(() => {
    if (subCats.length === 0) {
      return products.filter(
        (product) =>
          product.type === type &&
          product.price <= maxPrice
      );
    }    
    return products.filter(
      (product) =>
        product.type === type &&
        (transformedSubCats.length === 0 || transformedSubCats.includes(product.category)) &&
        product.price <= maxPrice
    );
  }, [products, transformedSubCats, maxPrice, type]);

  const sortedProducts = useMemo(() => {
    if (sort === "asc") {
      return filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      return filteredProducts.sort((a, b) => b.price - a.price);
    }
    return filteredProducts;
  }, [filteredProducts, sort]);


  return (
    <div className="list">
      {subCats.length > 0 ? (
        sortedProducts.map((item) => <Card item={item} key={item._id} />)
      ) : (
        sortedProducts.map((item) => <Card item={item} key={item._id} />)
      )}
    </div>
  );
};

export default List;