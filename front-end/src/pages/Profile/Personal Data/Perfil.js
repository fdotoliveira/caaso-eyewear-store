
import '../assets/css/main.css';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

export {Content_PData};

function Content_PData( {} ){

    useEffect(() => {

        let data = JSON.parse(localStorage.getItem('p-data'));

        if(data === null){

            data  =["", "", "", "", "", ""];

        }

        document.getElementById("first").value = data[0];
        document.getElementById("last").value = data[1];
        //document.getElementById("email").value = data[2];
        document.getElementById("gender").value = data[2];
        document.getElementById("phone").value = data[3];
        //document.getElementById("cpf").value = data[4];
        document.getElementById("birthdate").value = data[4];

        const login = JSON.parse(localStorage.getItem('login'));

        document.getElementById("email").value = login[0];
        document.getElementById("cpf").value = login[2];

    }, []);

    const clickPress = (evento) => {
        if (evento.key === 'Enter') {

            const resultado = [];

            resultado[0] = document.getElementById("first").value;
            resultado[1] = document.getElementById("last").value;
            //resultado[2] = document.getElementById("email").value;
            resultado[2] = document.getElementById("gender").value;
            resultado[3] = document.getElementById("phone").value;
            //resultado[4] = document.getElementById("cpf").value;
            resultado[4] = document.getElementById("birthdate").value;

            localStorage.setItem('p-data', JSON.stringify(resultado));
              
        }
    };

    return (

        <div className="central_div">
            <div className="central_box">
                <div className="input-label">
                    <h1>Personal Data</h1>
                </div>
                <div className="input-content">
                    <form>
                        <div className="row-profile">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="formGroupExampleInput">First name</label>
                                    <input type="text" className="form-control" id="first"
                                        placeholder="First name" onKeyDown={clickPress}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="formGroupExampleInput2">Last name</label>
                                    <input type="text" className="form-control" id="last"
                                        placeholder="Last name" onKeyDown={clickPress}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email"
                                onKeyDown={clickPress} readOnly/>
                        </div>
                        <div className="row-profile">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="gender">Gender</label>
                                    <select className="form-control" id="gender" onKeyDown={clickPress}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" placeholder="(XXX) XXX-XXXX"
                                        onKeyDown={clickPress}/>
                                </div>
                            </div>
                        </div>


                        <div className="row-profile">
                            <div className="form-group col-md-6">
                                <label for="cpf">CPF</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="cpf" placeholder="123.456.789-00"
                                        onKeyDown={clickPress} readOnly/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="birthdate">Birthdate</label>
                                <input type="date" className="form-control" id="birthdate" min="1900-12-31" max="2023-12-31"
                                    onKeyDown={clickPress}/>
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