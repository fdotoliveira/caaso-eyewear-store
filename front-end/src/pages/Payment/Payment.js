import './assets/css/main.css';
import React, {useState, useEffect} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import './assets/css/profile.css';
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch, useSelector } from "react-redux";

export {Payment, Payment_Choose, Payment_Pix, Payment_Card, Payment_New};

function Payment( {} ){

    return (
        <>
        <div className="central_div">
            <div className="central_box">
                <Outlet/>
            </div>
        </div>
        </>
    )
}

function Payment_Pix( {} ){

    return (
        <>
        <div className="input-label">
            <h1>Pix</h1>
        </div>
        <div className="input-content">
            <center>
            <p>Please, use the QRCode within 30 minutes.</p>
            <img src={process.env.PUBLIC_URL + '/qrcode.png'} alt="QR Code" style={{maxWidth: "100%"}}/>
            </center>
        </div>
        <div style={{padding: "10px"}}>
        </div>
        </>
    )
}

function Payment_New( {} ){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.products);

    const checkFields = (evento) => {

        const resultado = [];
        let checagem = true;

        resultado[0] = document.getElementById("cardNumber").value;
        resultado[1] = document.getElementById("cardName").value;
        resultado[2] = document.getElementById("expiration-date").value;
        resultado[3] = document.getElementById("security-code").value;

        for(let contador=0; contador<4; contador++){

            if(resultado[contador] === ""){

                checagem = false;
            }
        }

        if(checagem === true){

            let newArray = JSON.parse(localStorage.getItem('orders'));

            if(newArray === null){

                newArray = []
            }

            newArray.push(products);

            localStorage.setItem('orders', JSON.stringify(newArray));


            dispatch(resetCart());
            navigate("/");

        } else {

            evento.preventDefault();
            document.getElementById("warning-message").style.display = "inline";
        }
    }

    const clickPress = (evento) => {

        if (evento.key === "Enter"){

            checkFields();
        }
    }

    return (
        <>
            <div className="input-label">
                <h1>New Card</h1>
            </div>

            <center>
            <p id="warning-message" className="warning-message">All fields need to be filled in.</p>
            </center>

            <div className="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="number" className="form-control" id="cardNumber" placeholder="Card Number" onKeyDown={clickPress}/>
            </div>
            <div className="form-group">
                <label for="cardName">Card Name</label>
                <input type="text" class="form-control" id="cardName" placeholder="Card Name" onKeyDown={clickPress}/>
            </div>
            <div className="row-profile">
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="expiration-date">Expiration Date</label>
                        <input type="date" className="form-control" id="expiration-date" min="2023-01-01" max="2030-12-31" onKeyDown={clickPress}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="security-code">Security Code</label>
                        <input type="number" className="form-control" id="security-code" placeholder="123" max="9999" min="0" onKeyDown={clickPress}/>
                    </div>
                </div>
            </div>
            <div className="profile-button" style={{width: "70%", marginLeft: "15%"}}> 
                <Link onClick={checkFields} to="/" className='link-profile'>
                    <center>
                        Confirm Purchase
                    </center>
                </Link>
            </div>
        </>
    )
}

function Payment_Card( {} ){

    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.products);

    const clickPress = (evento) => {

        dispatch(resetCart());
    }

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
                <h1>Card</h1>
            </div>

            <div className="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="number" className="form-control" id="cardNumber" placeholder="Card Number" readOnly/>
            </div>
            <div className="form-group">
                <label for="cardName">Card Name</label>
                <input type="text" class="form-control" id="cardName" placeholder="Card Name" readOnly/>
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
                        <input type="number" className="form-control" id="security-code" placeholder="123" max="9999" min="0" readOnly/>
                    </div>
                </div>
            </div>
            <div className="profile-button" style={{width: "70%", marginLeft: "15%"}}> 
                <Link onClick={clickPress} to="/" className='link-profile'>
                    <center>
                        Confirm Purchase
                    </center>
                </Link>
            </div>
        </>
    )
}

function Payment_Choose( {} ){

    const [cardsArray, setCardsArray] = useState([]);
    let contador = 0;

    useEffect(() => {

        let payMethods = JSON.parse(localStorage.getItem('pay-methods'));

        if (payMethods === null){

            payMethods=[];
            localStorage.setItem('pay-methods', JSON.stringify(payMethods));
        }

        let arrayAux = [];

        for(let contador=0; contador<payMethods.length; contador++){

            
            arrayAux[contador] = payMethods[contador][1].substring(payMethods[contador][1].length-4);
        }
            
        setCardsArray(arrayAux);

    }, []);

    const whichPayData = (evento) => {

        localStorage.setItem('which-pay-method', JSON.stringify(evento.target.id-1));
    }

    return (
        <>
            <div className="input-label">
                <h1>Payment Method</h1>
            </div>
            <div className="input-content">
                <ul className="list-group">
                    {

                        cardsArray.map(num => {

                            contador++;

                            const payMethods = JSON.parse(localStorage.getItem('pay-methods'));

                            if(payMethods[contador-1][0] === "credit"){

                                return (
                                    <Link to={""+contador} className='link-profile'>
                                    <div onClick={whichPayData}>
                                        <li className="list-group-item" id={contador} key={num}>Credit Card with end "XXXX-XXXX-{num}"</li>
                                    </div>
                                    </Link>
                                )

                            } else {

                                return (
                                    <Link to={""+contador} className='link-profile'>
                                    <div onClick={whichPayData}>
                                        <li className="list-group-item" id={contador} key={num}>Debit Card with end "XXXX-XXXX-{num}"</li>
                                    </div>
                                    </Link>
                                )
                            }
                        })

                    }

                    <Link to={"pix"} className='link-profile'>
                    <div>
                        <li className="list-group-item" id={"pix"}>Pix</li>
                    </div>
                    </Link>

                    <Link to={"new"} className='link-profile'>
                    <div>
                        <li className="list-group-item" id={"new"}>Insert Card Data</li>
                    </div>
                    </Link>
                </ul>
            </div>

        </>
    )
}