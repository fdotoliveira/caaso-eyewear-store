import "../../../components/Cart/Cart.scss";
import '../assets/css/main.css';
import React, {useEffect, useState} from 'react';
import {Link, Outlet, useSearchParams} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_Orders_Data};

function Content_Orders_Data( {} ){

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const position = JSON.parse(localStorage.getItem('which-order'));
        const dataArray = JSON.parse(localStorage.getItem('orders'));
    
        setOrders(dataArray[position]);
        console.log(orders);
    
    }, []);

    return (
        <div className="central_div">
            <div className="central_box">
                <div className="input-content">

                    <div className="input-label">
                        <h1>Your Order</h1>
                    </div>

                    {orders.map((item) => (
                        <div className="item" key={item.id}>
                            <img src={item.img} alt="" style={{maxWidth: "100%"}}/>
                            <div className="details">
                            <h2>{item.title}</h2>
                            <p>{item.desc?.substring(0, 70)}</p>
                            <div className="price">
                                {item.quantity} x ${item.price}
                            </div>
                            </div>
                            <div style={{padding:"10px"}}></div>
                        </div>
                    ))}
                    

                </div>

                <div className="account-links">
                    <ul>
                        <li><Link to={"/perfil/p-data"} className="normal_text">Personal Data</Link></li>
                        <li><Link to={"/perfil/pay-methods"} className="normal_text">Payment Methods</Link></li>
                        <li><Link to={"/perfil/address"} className="normal_text">Addresses</Link></li>
                        <li><Link to={"/perfil/orders"} className="normal_text">My Orders</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Content_CreditData( {} ) {

    return (
        <>
            <div className="input-label">
                <h1>Credit Card</h1>
            </div>


            <div className="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="number" className="form-control" id="cardNumber" readOnly/>
            </div>
            <div className="form-group">
                <label for="cardName">Card Name</label>
                <input type="text" class="form-control" id="cardName" readOnly/>
            </div>
            <div className="row-profile">
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="expiration-date">Expiration Date</label>
                        <input type="date" className="form-control" id="expiration-date" min="2023-01-01" max="2030-12-31" readOnly/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="security-code">Security Code</label>
                        <input type="number" className="form-control" id="security-code" max="9999" min="0" readOnly/>
                    </div>
                </div>
            </div>
        </>
    )
}