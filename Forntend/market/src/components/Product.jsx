import React, { useState, useEffect } from "react";
import axios from "axios";
import './Product.css';
import { Link } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://54.144.145.14/api/items/")
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="pro-container mt-20">
            <h1>SHOP</h1>
            <div className="product-row">
                {products.map((product) => (
                    <div className="item" key={product.id}>
                        <div className="card">
                            <div className="card-image">
                                <img 
                                    src={`http://54.144.145.14/${product.image}`} 
                                    className="product-image" 
                                    alt={product.name} 
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.descripation}</p>
                                <p className="card-price">{product.price} birr</p>
                            </div>
                            <div className="card-button">
                                <Link 
                                    to={{
                                        pathname: `/view/${product.id}`,
                                        state: { product }
                                    }} 
                                    className="btn"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;
