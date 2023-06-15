
import '../assets/css/main.css';
import '../assets/css/profile.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

export {Content_Address};

function Content_Address( {} ){

    const [addressArray, setAddressArray] = useState([]);
    let contador = 0;

    useEffect(() => {

        let address = JSON.parse(localStorage.getItem('address'));

        if (address === null){

            address=[];
            localStorage.setItem('address', JSON.stringify(address));
        }

        const removeData = JSON.parse(localStorage.getItem('remove-address'));

        if(removeData === true){

            const position = JSON.parse(localStorage.getItem('which-address'));

            address.splice(position, 1);

            localStorage.setItem('address', JSON.stringify(address));
            localStorage.setItem('remove-address', JSON.stringify(false));
        }

        if(address.length === 0){

            document.getElementById("pay-message").innerHTML = "You don't have any address registered yet.";

        } else {

            document.getElementById("pay-message").style.display = "none";

            let arrayAux = [];
      
            for(let contador=0; contador<address.length; contador++){


                arrayAux[contador] = address[contador][1];
            }
            
            setAddressArray(arrayAux);

        }

    }, []);

    const whichAddress = (evento) => {

        localStorage.setItem('which-address', JSON.stringify(evento.target.id-1));
    }

    return (
        <div className="profile-layout1">
            <div className="central_div">
                <div className="central_box">
                    <div className="input-label">
                        <h1>Addresses</h1>
                    </div>
                    <div className="input-content">
                        <ul className="list-group">
                            {

                                addressArray.map(num => {

                                    contador++;

                                    return (
                                        <Link to={""+contador} className='link-profile' onClick={whichAddress}>
                                            <div>
                                                <li className="list-group-item" id={contador} key={num}>Address with CEP "{num}"</li>
                                            </div>
                                        </Link>
                                    )
                                })

                            }
                        </ul>
                            <div className="row-profile">
                                <div className="col-md-6">
                                    <div className="form-group">

                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <center>
                                    <p className='profile-text' id='pay-message'>You don't have any address registered yet.</p>
                                </center>
                            </div>

                            <div className="row-profile">
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
                            Add New Address
                        </center>
                    </div>
            </Link>
        </div>
    )
}