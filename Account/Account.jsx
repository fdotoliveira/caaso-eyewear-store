import React from "react";
import "./Account.scss";
import { Link } from "react-router-dom";

const Account = () => {
    return (
        <div className="dropdown">
            <>
                <Link className="link" to="#">
                    <div className="item">
                        My Account
                    </div>
                </Link>
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
            </>
        </div>
    );
};

export default Account;