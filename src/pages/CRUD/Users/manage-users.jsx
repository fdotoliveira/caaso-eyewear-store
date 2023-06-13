import React, { useState, useEffect } from "react";
import "../bootstrap.scss";

export function Users() {
    const [content, setContent] = useState(<UserList showForm={showForm}/>);

    function showList() {
        setContent(<UserList showForm={showForm} />);
    }

    function showForm(user) {
        setContent(<UserForm user={user} showList={showList} />);
    }

    return (
        <div className="_container my-5">
            {content}
        </div>
    )
}

function UserList(props) {
    const [users, setUsers] = useState([]);

    function fetchUsers() {
        fetch("http://localhost:3002/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json()
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => console.log("Error: ", error));
    }

    useEffect(() => fetchUsers(), []);

    function deleteUser(id) {
        fetch("http://localhost:3002/users/" + id, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => fetchUsers());
    }

    return (
        <>

            <h2 className="text-center mb-3">List of Users</h2>
            <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Create</button>
            <button onClick={() => fetchUsers()} type="button" className="btn btn-outline-primary me-2">Refresh</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Password</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.password}</td>
                                    <td>{user.createdAt}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button onClick={() => props.showForm(user)} type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button onClick={() => deleteUser(user.id)} type="button" className="btn btn-danger btn-sm">Delete</button>
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

function UserForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        
        const user = Object.fromEntries(formData.entries());
        
        if (!user.name || !user.email || !user.age || !user.password) {
            console.log("Please provide all the required information!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all the required information!
                </div>
            )
            return;
        }

        console.log( props.user.id)
        console.log(typeof props.user.id)

        if (props.user.id) {
            fetch("http://localhost:3002/users/" + props.user.id, {
                method: "PATCH",
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
                .then((data) => props.showList())
                .catch((error) => {
                    console.log("Error: ", error);
                });
        }
        else {
            user.createdAt = new Date().toISOString().slice(0, 10);

            fetch("http://localhost:3002/users", {
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
                .then((data) => props.showList())
                .catch((error) => {
                    console.log("Error: ", error);
                });
        }
    }

    return (
        <>
            <h2 className="text-center mb-3">{props.user.id ? "Edit user" : "Create New user"}</h2>

            {errorMessage}

            <div className="col-lg-6 mx-auto">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {props.user.id && <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" name="id" defaultValue={props.user.id} />
                        </div>
                    </div>}

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="name" defaultValue={props.user.name} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="email" defaultValue={props.user.email} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Age</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="age" defaultValue={props.user.age} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input className="form-control" type="password" name="password" defaultValue={props.user.password} />
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

export default Users;