import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export { Login, Login_Content, SignUp_Content, ForgotPassword_Content };

function Login() {

    return (
        <>
            <div className="central_div">
                <div className="central_box">

                    <Outlet />
                </div>
            </div>
        </>
    )
}

function Login_Content() {
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const user = Object.fromEntries(formData.entries());

        if (!user.userName || !user.password) {
            console.log("Please provide all the required information!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all the required information!
                </div>
            )
            return;
        }

        fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }

                fetch("http://localhost:3001/user/" + user.userName)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Unexpected Server Response");
                        }
                        return response.json()
                    })
                    .then((data) => {
                        localStorage.setItem('login', JSON.stringify(data[0].user));
                        navigate("/")
                    })
                    .catch((error) => console.log("Error: ", error));

                return response.json()

            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    const checkFields = (event) => {

        const resultado = [];
        let checagem = true;

        resultado[0] = document.getElementById("email").value;
        resultado[1] = document.getElementById("password").value;

        for (let contador = 0; contador < 2; contador++) {

            if (resultado[contador] === "") {

                checagem = false;
            }
        }

        if (checagem === true) {

            localStorage.setItem('login', JSON.stringify(resultado));
            console.log(resultado);

            navigate("/");

        } else {

            event.preventDefault();
            document.getElementById("warning-message").style.display = "inline";
        }
    }

    const clickPress = (event) => {

        if (event.key === "Enter") {

            checkFields();
        }
    }

    return (
        <>
            <div className="input-label">
                <h1>Login</h1>
            </div>
            <div className="input-content">
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className="_row mb-3">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="userName" />
                        </div>
                    </div>
                    <div className="_row mb-3">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="password" name="password" />
                        </div>
                    </div>
                    <div style={{ padding: "10px" }}></div>
                    <div className="_row">
                        <div className="offset-sm-2 col-sm-8 d-grid">
                            <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div style={{ padding: "15px" }}></div>
            <div className="account-links">
                <ul>
                    <li ><Link to={"forgot-password"} className="normal_text">Forgot your password?</Link></li>
                    <li><Link to={"sign-up"} className="normal_text">Create Account</Link></li>
                </ul>
            </div>
        </>
    )
}

function SignUp_Content() {
    const [errorMessage, setErrorMessage] = useState("");

    function handleRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const user = Object.fromEntries(formData.entries());

        if (!user.userName || !user.email || !user.password || user.confirmedPassword) {
            console.log("Please provide all the required information!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all the required information!
                </div>
            )
            return;
        }

        fetch("http://localhost:3001/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json()

            })
            .catch((error) => {
                console.log("Error: ", error);
            });

        navigate("/login");
    }

    const navigate = useNavigate();

    const checkFields = (event) => {

        const resultado = [];
        let checagem = true;

        resultado[0] = document.getElementById("email").value;
        resultado[1] = document.getElementById("password").value;
        resultado[2] = document.getElementById("confirm-password").value;
        resultado[3] = document.getElementById("cpf").value;

        for (let contador = 0; contador < 4; contador++) {

            if (resultado[contador] === "") {

                document.getElementById("warning-message").innerHTML = "All fields need to be filled in.";
                checagem = false;
            }
        }
        if (!document.getElementById("terms-conditions").checked) {

            document.getElementById("warning-message").innerHTML = "You need to agree with our terms and conditions.";
            checagem = false;
        }

        if (resultado[1] !== resultado[2]) {

            document.getElementById("warning-message").innerHTML = "You typed two different passwords.";
            checagem = false;
        }

        if (checagem === true) {

            resultado.splice(2, 1);

            console.log(resultado);

            localStorage.setItem('login', JSON.stringify(resultado));

            navigate("/");

        } else {
            console.log("A");
            event.preventDefault();
            document.getElementById("warning-message").style.display = "inline";
        }
    }

    return (
        <>
            <div className="input-label">
                <h1>Sign Up</h1>
            </div>
            <div className="input-content">
                <form onSubmit={(event) => handleRegister(event)}>
                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Username</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="userName" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="name" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="email" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Telephone</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="tel" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">CPF</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="cpf" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input className="form-control" type="password" name="password" />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Confirm Password</label>
                        <div className="col-sm-8">
                            <input className="form-control" type="password" name="confirmPassword" />
                        </div>
                    </div>
                    <div style={{ padding: "10px" }}></div>
                    <div className="_row">
                        <div className="offset-sm-2 col-sm-8 d-grid">
                            <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

function ForgotPassword_Content() {

    return (
        <>
            <div className="input-label">
                <h1>Reset your password</h1>
            </div>
            <div className="input-content">
                <form>
                    <center><p>Please, type your email to receive a temporary password.</p></center>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" />
                    </div>
                </form>
            </div>
            <div style={{ padding: "10px" }}></div>
        </>

    )
}