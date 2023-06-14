import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_PMethod};

function Content_PMethod( {} ){

    const [cardsArray, setCardsArray] = useState([]);
    let contador = 0;

    useEffect(() => {

        let payMethods = JSON.parse(localStorage.getItem('pay-methods'));

        if (payMethods === null){

            payMethods=[];
            localStorage.setItem('pay-methods', JSON.stringify(payMethods));
        }

        const removeData = JSON.parse(localStorage.getItem('remove-pay-method'));

        if(removeData === true){

            const position = JSON.parse(localStorage.getItem('which-pay-method'));

            payMethods.splice(position, 1);

            localStorage.setItem('pay-methods', JSON.stringify(payMethods));
            localStorage.setItem('remove-pay-method', JSON.stringify(false));
        }


        if(payMethods.length === 0){

            document.getElementById("pay-message").innerHTML = "You don't have any payment method registered yet.";

        } else {

            document.getElementById("pay-message").style.display = "none";

            let arrayAux = [];

            for(let contador=0; contador<payMethods.length; contador++){

            
                arrayAux[contador] = payMethods[contador][1].substring(payMethods[contador][1].length-4);
            }
            
            setCardsArray(arrayAux);

        }

    }, []);

    const whichPayData = (evento) => {

        localStorage.setItem('which-pay-method', JSON.stringify(evento.target.id-1));
    }

    return (
        <div className="profile-layout1">
            <div className="central_div">
                <div className="central_box">
                    <div className="input-label">
                        <h1>Payment Methods</h1>
                    </div>
                    <div className="input-content">
                        <ul className="list-group">
                            {

                                cardsArray.map(num => {

                                    contador++;

                                    const payMethods = JSON.parse(localStorage.getItem('pay-methods'));

                                    if(payMethods[contador-1][0] === "credit"){

                                        return (
                                            <Link to={""+contador+"/credit"} className='link-profile' onClick={whichPayData}>
                                                <div>
                                                    <li className="list-group-item" id={contador} key={num}>Credit Card with end "XXXX-XXXX-{num}"</li>
                                                </div>
                                            </Link>
                                        )

                                    } else {

                                        return (
                                            <Link to={""+contador+"/debit"} className='link-profile' onClick={whichPayData}>
                                                <div>
                                                    <li className="list-group-item" id={contador} key={num}>Debit Card with end "XXXX-XXXX-{num}"</li>
                                                </div>
                                            </Link>
                                        )
                                    }
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
                                    <p className='profile-text' id='pay-message'>You don't have any payment method registered yet.</p>
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
            <Link to={"create"} className='link-profile'>
                    <div className="profile-button"> 
                        <center>
                            Add New Method
                        </center>
                    </div>
            </Link>
        </div>
    )
}