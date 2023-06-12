import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <a href="#">
            <img src="https://images.pexels.com/photos/1987343/pexels-photo-1987343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span class="img-overlay">View details</span>
          </a>
        </div>
        <div className="row">
          <a href="#">
            <img style={{ height: 'max-content' }} src="https://images.pexels.com/photos/2095544/pexels-photo-2095544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span class="img-overlay">View details</span>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <a href='#'>
            <img src="https://images.pexels.com/photos/2901941/pexels-photo-2901941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span class="img-overlay">View details</span>
          </a>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <a href="#">
                <img style={{ height: 'max-content' }} src="https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span class="img-overlay">View details</span>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <a href="#">
                <img style={{ height: 'max-content' }} src="https://images.pexels.com/photos/15941068/pexels-photo-15941068/free-photo-of-banco-assento-tribunal-roupas-pretas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span class="img-overlay">View details</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <a href="#">
            <img src="https://images.pexels.com/photos/567448/pexels-photo-567448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span class="img-overlay">View details</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Categories;