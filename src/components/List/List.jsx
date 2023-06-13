import React from "react";
import { useMemo } from "react";
import "./List.scss";
import Card from "../Card/Card";
import db from "../../db.json";


const List = ({ subCats, maxPrice, sort, catId, tipo}) => {
  console.log(subCats);
  const filteredProducts = useMemo(() => {
    return db.products.filter(
      (product) =>
        product.type === tipo &&
        (subCats.length === 0 || subCats.includes(product.id.toString())) &&
        product.price <= maxPrice
    );
  }, [db.products, subCats, maxPrice]);

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