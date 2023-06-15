import '../assets/css/main.css';
import {Link, useNavigate} from "react-router-dom";
import '../assets/css/profile.css';

export {Content_Address_Create};

function Content_Address_Create( {} ){
    
    const navigate = useNavigate();

    const clickPress = (evento) => {

        if (evento.key === "Enter"){

            const resultado = [];
            let checagem = true;

            resultado[0] = document.getElementById("country").value
            resultado[1] = document.getElementById("cep").value;
            resultado[2] = document.getElementById("address").value;
            resultado[3] = document.getElementById("house-number").value;
            resultado[4] = document.getElementById("neighborhood").value;
            resultado[5] = document.getElementById("city").value;
            resultado[6] = document.getElementById("state").value;
            resultado[7] = document.getElementById("complement").value;

            for(let contador=0; contador<7; contador++){

                if(resultado[contador] === ""){

                    checagem = false;
                }
            }

            if(checagem === true){

                let newArray = JSON.parse(localStorage.getItem('address'));

                if (newArray === null){

                    newArray=[];
                }

                newArray.push(resultado);

                localStorage.setItem('address', JSON.stringify(newArray));

                navigate("/perfil/address");

            } else {

                document.getElementById("warning-message").style.display = "inline";
            }
        }
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
                        <div className="row-profile">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="country">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Country" onKeyDown={clickPress}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" class="form-control" id="cep" placeholder="12345-678" onKeyDown={clickPress}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="Your Address" onKeyDown={clickPress}/>
                        </div>
                        <div className="row-profile">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="house-number">House Number</label>
                                    <input type="number" className="form-control" id="house-number" placeholder="1234" onKeyDown={clickPress}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="neighborhood">Neighborhood</label>
                                    <input type="text" className="form-control" id="neighborhood" placeholder="Neighborhood" onKeyDown={clickPress}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="complement">Complement (optional)</label>
                            <input type="text" className="form-control" id="complement" placeholder="Complement" onKeyDown={clickPress}/>
                        </div>
                        <div className="row-profile">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="city">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="City" onKeyDown={clickPress}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="state">State</label>
                                    <input type="text" className="form-control" id="state" placeholder="State" onKeyDown={clickPress}/>
                                </div>
                            </div>
                        </div>

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
