import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Product from "./components/Product";
import Dashboard from "./components/Dashboard";
import LoginModal from "./components/ModalLogin";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/shop" element={<Product />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/view/:id" element={<ProductDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;