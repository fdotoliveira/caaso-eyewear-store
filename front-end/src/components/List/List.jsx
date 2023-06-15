import React from "react";
import { useMemo } from "react";
import "./List.scss";
import Card from "../Card/Card";
import db from "../../db.json";


const List = ({ subCats, maxPrice, sort, catId, type}) => { 
  console.log("type::");
  console.log(type);
  console.log("subCats::");
  console.log(subCats);
  console.log("catId::");
  console.log(catId);
  const combinedIds = subCats.join(",");
  const individualIds = combinedIds.split(",");
  const transformedSubCats = individualIds.map((id) => parseInt(id, 10));

  const filteredProducts = useMemo(() => {
    if (subCats.length === 0) {
      //return catId; // Retorna um array contendo apenas o catId
      return db.products.filter(
        (product) =>
          product.type === type &&
          product.price <= maxPrice
      );
    }

    return db.products.filter(
      (product) =>
        product.type === type &&
        (transformedSubCats.length === 0 || transformedSubCats.includes(product.id)) &&
        product.price <= maxPrice
    );
  }, [db.products, transformedSubCats, maxPrice, subCats]);

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
        sortedProducts.map((item) => <Card item={item} key={item.id} />)
      ) : (
        sortedProducts.map((item) => <Card item={item} key={item.id} />)
      )}
    </div>
  );
};

export default List;