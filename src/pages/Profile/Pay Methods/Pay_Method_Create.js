import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import {Link, Outlet, useNavigate} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_PMethod_Create, CreditCard, DebitCard};

function Content_PMethod_Create(){

    const navigate = useNavigate();

    const onChangeMethodChosen = (evento) => {

        navigate(evento.target.value);
    }

    return (
        <div className="central_div">
            <div className="central_box">
                <div className="input-label">
                    <h1>Add New Payment Method</h1>
                </div>
                <div className="input-content">
                    <form>

                        <div className="row">
                        </div>

                        <div className="form-group">
                            <label for="pay-method">Choose your Payment Method.</label>
                                <select className="form-control" id="pay-method" onChange={onChangeMethodChosen}>
                                    <option value=""></option>
                                    <option value="credit">Credit Card</option>
                                    <option value="debit">Debit Card</option>
                                </select>
                        </div>

                        <div className="row">
                        </div>

                        <Outlet/>

                    </form>
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

function CreditCard( {} ) {

    const navigate = useNavigate();

    const clickPress = (evento) => {

        if (evento.key === "Enter"){

            const resultado = [];
            let checagem = true;

            resultado[0] = "credit";
            resultado[1] = document.getElementById("cardNumber").value;
            resultado[2] = document.getElementById("cardName").value;
            resultado[3] = document.getElementById("expiration-date").value;
            resultado[4] = document.getElementById("security-code").value;

            for(let contador=0; contador<5; contador++){

                if(resultado[contador] === ""){

                    checagem = false;
                }
            }

            if(checagem === true){

                const newArray = JSON.parse(localStorage.getItem('pay-methods'));

                newArray.push(resultado);

                localStorage.setItem('pay-methods', JSON.stringify(newArray));

                navigate("/perfil/pay-methods");

            } else {

                document.getElementById("warning-message").style.display = "inline";
            }
        }
    }

    return (
        <>
            <div className="input-label">
                <h1>New Credit Card</h1>
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
            <div className="row">
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
        </>
    )
}

function DebitCard( {} ){

    const navigate = useNavigate();

    const clickPress = (evento) => {

        if (evento.key === "Enter"){

            const resultado = [];
            let checagem = true;

            resultado[0] = "debit";
            resultado[1] = document.getElementById("cardNumber").value;
            resultado[2] = document.getElementById("cardName").value;
            resultado[3] = document.getElementById("expiration-date").value;
            resultado[4] = document.getElementById("security-code").value;

            for(let contador=0; contador<5; contador++){

                if(resultado[contador] === ""){

                    checagem = false;
                }
            }

            if(checagem === true){

                const newArray = JSON.parse(localStorage.getItem('pay-methods'));

                newArray.push(resultado);

                localStorage.setItem('pay-methods', JSON.stringify(newArray));

                navigate("/perfil/pay-methods");

            } else {

                document.getElementById("warning-message").style.display = "inline";
            }
        }
    }

    return (
        <>
            <div className="input-label">
                <h1>New Debit Card</h1>
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
            <div className="row">
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
        </>
    )
}