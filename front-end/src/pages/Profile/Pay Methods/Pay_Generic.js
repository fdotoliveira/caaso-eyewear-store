
import '../assets/css/main.css';
import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_CreditData, Content_DebitData, Content_Pay_Data};

function Content_Pay_Data( {} ){

    const clickPress = (evento) => {

        localStorage.setItem('remove-pay-method', JSON.stringify(true));
    }

    return (
        <div className="central_div">
            <div className="central_box">
                <div className="input-content">

                    <Outlet/>

                </div>

                <div className="row-profile" style={{width: "75%"}}>
                    <Link to={"/perfil/pay-methods"} className="link-profile" onClick={clickPress}>
                        <div className="profile-button" style={{width: "250%"}}> 
                            <center>
                                Remove
                            </center>
                        </div>
                    </Link>
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

    useEffect(() => {

        const position = JSON.parse(localStorage.getItem('which-pay-method'));
        const dataArray = JSON.parse(localStorage.getItem('pay-methods'));

        const data = dataArray[position];

        document.getElementById("cardNumber").value = data[1];
        document.getElementById("cardName").value = data[2];
        document.getElementById("expiration-date").value = data[3];
        document.getElementById("security-code").value = data[4];

    }, []);

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

function Content_DebitData( {} ) {

    useEffect(() => {

        const position = JSON.parse(localStorage.getItem('which-pay-method'));
        const dataArray = JSON.parse(localStorage.getItem('pay-methods'));

        const data = dataArray[position];

        document.getElementById("cardNumber").value = data[1];
        document.getElementById("cardName").value = data[2];
        document.getElementById("expiration-date").value = data[3];
        document.getElementById("security-code").value = data[4];

    }, []);

    return (
        <>
            <div className="input-label">
                <h1>Debit Card</h1>
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