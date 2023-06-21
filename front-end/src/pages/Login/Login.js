import {Link, Outlet, useNavigate} from "react-router-dom";

export {Login, Login_Content, SignUp_Content, ForgotPassword_Content};

function Login(){

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

function Login_Content(){

    const navigate = useNavigate();

    const clickPress = (event) => {

        if(event.key === "Enter"){
            const resultado = [];
            let checagem = true;

            resultado[0] = document.getElementById("email").value;
            resultado[1] = document.getElementById("password").value;

            for(let contador=0; contador<2; contador++){

                if (resultado[contador] === ""){

                    checagem = false;
                }
            }

            if(checagem === true){

                localStorage.setItem('login', JSON.stringify(resultado));
                console.log(resultado);

                navigate("/");

            } else {

                document.getElementById("warning-message").style.display = "inline";
            }
        }
    }

    return (
        <>
        <div className="input-label">
            <h1>Login</h1>
        </div>
        <div className="input-content">
            <form>
                <center>
                <p id="warning-message" style={{display: "none", color: "red"}}>All fields need to be filled in.</p>
                </center>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email"
                        onKeyDown={clickPress}/>
                </div>
                <div style={{padding: "10px"}}></div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        onKeyDown={clickPress}/>
                </div>
            </form>
        </div>
        <div style={{padding: "10px"}}></div>
        <div className="account-links">
            <ul>
                <li><Link to={"forgot-password"} className="normal_text">Forgot your password?</Link></li>
                <li><Link to={"sign-up"} className="normal_text">Create Account</Link></li>
            </ul>
        </div>
        </>
    )
}

function SignUp_Content(){

    const navigate = useNavigate();

    const clickPress = (event) => {

        if(event.key === "Enter"){

            const resultado = [];
            let checagem = true;

            resultado[0] = document.getElementById("email").value;
            resultado[1] = document.getElementById("password").value;
            resultado[2] = document.getElementById("confirm-password").value;

            for(let contador=0; contador<3; contador++){

                if (resultado[contador] === ""){

                    document.getElementById("warning-message").innerHTML = "All fields need to be filled in.";
                    checagem = false;
                }
            }
            if(!document.getElementById("terms-conditions").checked){
                
                document.getElementById("warning-message").innerHTML = "You need to agree with our terms and conditions.";
                checagem = false;
            }

            if(resultado[1] !== resultado[2]){

                document.getElementById("warning-message").innerHTML = "You typed two different passwords.";
                checagem = false;
            }

            if(checagem === true){

                resultado.splice(2, 1);

                console.log(resultado);

                localStorage.setItem('login', JSON.stringify(resultado));

                navigate("/");

            } else {

                document.getElementById("warning-message").style.display = "inline";
            }
        }
    }

    return (
        <>
        <div className="input-label">
            <h1>Sign Up</h1>
        </div>
        <div className="input-content">
            <form>
                <center>
                <p id="warning-message" style={{display: "none", color: "red"}}>All fields need to be filled in.</p>
                </center>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email"
                        onKeyDown={clickPress}/>
                </div>
                <div style={{padding: "10px"}}></div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        onKeyDown={clickPress}/>
                </div>
                <div style={{padding: "10px"}}></div>
                <div className="form-group">
                    <label for="password">Confirm password</label>
                    <input type="password" class="form-control" id="confirm-password" placeholder="Confirm password"
                        onKeyDown={clickPress}/>
                </div>
                <div style={{padding: "10px"}}></div>
                <div className="form-group">
                    <input type="checkbox" id="terms-conditions" name="terms-conditions" value="terms-conditions"/>
                    <label for="terms-conditions"> I agree with any terms and conditions.</label>
                </div>
                <div style={{padding: "10px"}}></div>
                <div className="form-group">
                    <input type="checkbox" id="receive-email" name="receive-email" value="receive-email"/>
                    <label for="receive-email"> I wish to receive the latest fashion on my email box.</label>
                </div>
            </form>
        </div>
        <div style={{padding: "10px"}}></div>
        </>
    )
}

function ForgotPassword_Content(){

    return(
        <>
        <div className="input-label">
            <h1>Reset your password</h1>
        </div>
        <div className="input-content">
            <form>
                <center><p>Please, type your email to receive a temporary password.</p></center>
                <div className="form-group">
                    <label for="email">Email address*</label>
                    <input type="email" class="form-control" id="email" placeholder="Email"/>
                </div>
            </form>
        </div>
        <div style={{padding: "10px"}}></div>
        </>

    )
}