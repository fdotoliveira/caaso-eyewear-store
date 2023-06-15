import React, { useState, useEffect } from "react";
import "../bootstrap.scss";

export function Admins() {
    const [content, setContent] = useState(<AdminList showForm={showForm} />);

    function showList() {
        setContent(<AdminList showForm={showForm} />);
    }

    function showForm(admin) {
        setContent(<AdminForm admin={admin} showList={showList} />);
    }

    return (
        <div className="_container my-5">
            {content}
        </div>
    )
}

function AdminList(props) {
    const [admins, setAdmins] = useState([]);

    function fetchAdmins() {
        fetch("http://localhost:3003/admins")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json()
            })
            .then((data) => {
                setAdmins(data);
            })
            .catch((error) => console.log("Error: ", error));
    }

    useEffect(() => fetchAdmins(), []);

    function deleteAdmin(id) {
        fetch("http://localhost:3003/admins/" + id, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => fetchAdmins());
    }

    return (
        <>

            <h2 className="text-center mb-3">List of Admins</h2>
            <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Create</button>
            <button onClick={() => fetchAdmins()} type="button" className="btn btn-outline-primary me-2">Refresh</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        admins.map((admin, index) => {
                            return (
                                <tr key={index}>
                                    <td>{admin.id}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.password}</td>
                                    <td>{admin.createdAt}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button onClick={() => props.showForm(admin)} type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button onClick={() => deleteAdmin(admin.id)} type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>

                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function AdminForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const admin = Object.fromEntries(formData.entries());

        if (!admin.name || !admin.email || !admin.password) {
            console.log("Please provide all the required information!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all the required information!
                </div>
            )
            return;
        }

        console.log(props.admin.id)
        console.log(typeof props.admin.id)

        if (props.admin.id) {
            fetch("http://localhost:3003/admins/" + props.admin.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(admin)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not OK");
                    }
                    return response.json()
                })
                .then((data) => props.showList())
                .catch((error) => {
                    console.log("Error: ", error);
                });
        }
        else {
            admin.createdAt = new Date().toISOString().slice(0, 10);

            fetch("http://localhost:3003/admins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(admin)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not OK");
                    }
                    return response.json()
                })
                .then((data) => props.showList())
                .catch((error) => {
                    console.log("Error: ", error);
                });
        }
    }

    return (
        <>
            <h2 className="text-center mb-3">{props.admin.id ? "Edit Admin" : "Create New Admin"}</h2>

            {errorMessage}

            <div className="col-lg-6 mx-auto">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {props.user.id && <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" name="id" defaultValue={props.admin.id} />
                        </div>
                    </div>}

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="name" defaultValue={props.admin.name} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="email" defaultValue={props.admin.email} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input className="form-control" type="password" name="password" defaultValue={props.admin.password} />
                        </div>
                    </div>


                    <div className="_row">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                            <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                        </div>
                        <div className="col-sm-4 d-grid">
                            <button onClick={() => props.showList()} type="button" className="btn btn-secundary me-2">Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Admins;