import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_AddressData};

function Content_AddressData( {} ){
    
    useEffect(() => {
        
        const position = JSON.parse(localStorage.getItem('which-address'));
        const dataArray = JSON.parse(localStorage.getItem('address'));

        const data = dataArray[position];

        document.getElementById("country").value = data[0];
        document.getElementById("cep").value = data[1];
        document.getElementById("address").value = data[2];
        document.getElementById("house-number").value = data[3];
        document.getElementById("neighborhood").value = data[4];
        document.getElementById("city").value = data[5];
        document.getElementById("state").value = data[6];
        document.getElementById("complement").value = data[7];

    }, []);

    const clickPress = (evento) => {

        localStorage.setItem('remove-address', JSON.stringify(true));
    }

    return (
        <div className="central_div">
            <div className="central_box">
                <div className="input-label">
                    <h1>Add New Address</h1>
                </div>
                <div className="input-content">
                    <form>

                        <center>
                        <p id="warning-message" className="warning-message">All fields need to be filled in.</p>
                        </center>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="country">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Country" readOnly/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" class="form-control" id="cep" placeholder="12345-678" readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="Your Address" readOnly/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="house-number">House Number</label>
                                    <input type="number" className="form-control" id="house-number" placeholder="1234" readOnly/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="neighborhood">Neighborhood</label>
                                    <input type="text" className="form-control" id="neighborhood" placeholder="Neighborhood" readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="complement">Complement (optional)</label>
                            <input type="text" className="form-control" id="complement" placeholder="Complement" readOnly/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="city">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="City" readOnly/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="state">State</label>
                                    <input type="text" className="form-control" id="state" placeholder="State" readOnly/>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="row" style={{width: "75%"}}>
                    <Link to={"/perfil/address"} className="link-profile" onClick={clickPress}>
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