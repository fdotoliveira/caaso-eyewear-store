import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_Orders};

function Content_Orders( {} ){

    const [ordersArray, setOrdersArray] = useState([]);
    let contador = 0;

    useEffect(() => {

        let orders = JSON.parse(localStorage.getItem('orders'));

        if (orders === null){

            orders=[];
        }

        if(orders.length === 0){

            document.getElementById("pay-message").innerHTML = "You don't have any order registered yet.";

        } else {

            document.getElementById("pay-message").style.display = "none";

            let arrayAux = [];
      
            for(let contador=0; contador<orders.length; contador++){

                arrayAux[contador] = orders[contador][1];
            }
            
            setOrdersArray(arrayAux);

        }

    }, []);

    const whichOrder = (evento) => {

        const orders = JSON.parse(localStorage.getItem('orders'));

        localStorage.setItem('which-address', JSON.stringify(orders[evento.target.id-1]));
    }

    return (
        <div className="profile-layout1">
            <div className="central_div">
                <div className="central_box">
                    <div className="input-label">
                        <h1>Orders</h1>
                    </div>
                    <div className="input-content">
                        <ul className="list-group">
                            {

                                ordersArray.map(num => {

                                    contador++;

                                    return (
                                        <Link to={""+contador} className='link-profile' onClick={whichOrder}>
                                            <div>
                                                <li className="list-group-item" id={contador} key={num}>Order of "{num}"</li>
                                            </div>
                                        </Link>
                                    )
                                })

                            }
                        </ul>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">

                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <center>
                                    <p className='profile-text' id='pay-message'>You don't have any order registered yet.</p>
                                </center>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">

                                    <div className="input-group">

                                    </div>
                                </div>
                                <div className="form-group col-md-6">

                                </div>
                            </div>
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
        </div>
    )
}