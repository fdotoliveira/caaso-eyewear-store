import React, { useState, useEffect } from "react";
import "../bootstrap.scss";

export function Products() {
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList() {
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm(product) {
        setContent(<ProductForm product={product} showList={showList} />);
    }

    return (
        <div className="_container my-5">
            {content}
        </div>
    )
}

function ProductList(props) {
    const [products, setProducts] = useState([]);

    function fetchProducts() {
        fetch("http://localhost:3001/product")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json();
            })
            .then((data) => {
                // Converter preço e quantidade para números
                const productsWithNumbers = data.map((product) => ({
                    ...product,
                    price: parseFloat(product.price),
                    stock: parseInt(product.stock),
                }));
                setProducts(productsWithNumbers);
            })
            .catch((error) => console.log("Error: ", error));
    }

    useEffect(() => fetchProducts(), []);

    function deleteProduct(id) {
        fetch("http://localhost:3001/product/" + id, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => fetchProducts());
    }

    return (
        <>

            <h2 className="text-center mb-3">List of Products</h2>
            <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Create</button>
            <button onClick={() => fetchProducts()} type="button" className="btn btn-outline-primary me-2">Refresh</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product._id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.type}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.desc}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button onClick={() => props.showForm(product)} type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button onClick={() => deleteProduct(product._id)} type="button" className="btn btn-danger btn-sm">Delete</button>
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

function ProductForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const product = Object.fromEntries(formData.entries());

        product.price = parseFloat(product.price);
        product.stock = parseInt(product.stock);

        if (!product.title || !product.type || product.price === "" || product.stock === "" || !product.category) {
            console.log("Please provide all the required information!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all the required information!
                </div>
            )
            return;
        }

        console.log(product)

        if (props.product._id) {
            fetch("http://localhost:3001/product/" + props.product._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
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
            fetch("http://localhost:3001/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
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
            <h2 className="text-center mb-3">{props.product.id ? "Edit Product" : "Create New Product"}</h2>

            {errorMessage}

            <div className="col-lg-6 mx-auto">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {props.product.id && <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" name="id" defaultValue={props.product.id} />
                        </div>
                    </div>}

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Title</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="title" defaultValue={props.product.title} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Category</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="category" defaultValue={props.product.category} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Type</label>
                        <div className="col-sm-8">
                            <select name="type" className="form-select" defaultValue={props.product.type}>
                                <option value='Eyeglasses'>Eyeglasses</option>
                                <option value='Sunglasses'>Sunglasses</option>
                                <option value='Accessories'>Accessories</option>
                            </select>
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Price</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="price" defaultValue={props.product.price} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Quantity</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="stock" defaultValue={props.product.stock} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <textarea className="col-sm-8" name="desc" defaultValue={props.product.desc} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Imagem 1</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="image1" defaultValue={props.product.image1} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Imagem 2</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="image2" defaultValue={props.product.image2} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Imagem 3</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="image3" defaultValue={props.product.image3} />
                        </div>
                    </div>

                    <div className="_row mb-3">
                        <label className="col-sm-4 col-form-label">Imagem 4</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="image4" defaultValue={props.product.image4} />
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

export default Products;