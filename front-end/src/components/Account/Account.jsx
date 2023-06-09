import React from "react";
import "./Account.scss";
import { Link, useNavigate } from "react-router-dom";

const Account = ({ isOpen }) => {

    const navigate = useNavigate();

    const handleLogOutClick = () => {

        localStorage.removeItem('login');
        localStorage.removeItem('pay-methods');
        localStorage.removeItem('p-data');
        localStorage.removeItem('address');
        localStorage.removeItem('orders');
        isOpen();
        navigate("/");
    }

    return (
        <div className="dropdown">
            <>
                <Link className="link" to="perfil/p-data">
                    <div className="item">
                        My Account
                    </div>
                </Link>
                {JSON.parse(localStorage.getItem('login')).admin === true ?
                    <div>
                        <Link className="link" to="product-list">
                            <div className="item">
                                Product List
                            </div>
                        </Link>
                        <Link className="link" to="user-list">
                            <div className="item">
                                User List
                            </div>
                        </Link>
                        <Link className="link" to="admin-list">
                            <div className="item">
                                Admin List
                            </div>
                        </Link>
                    </div>

                    :

                    ""
                }

                <div className="item" onClick={handleLogOutClick}>
                    Log Out
                </div>
            </>
        </div>
    );
};

export default Account;