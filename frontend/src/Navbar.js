import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_URL } from './config';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #eaeaea" }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src='media/images/logo.png' style={{ width: "120px" }} alt='logo' />
                </Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center mt-3 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">Support</Link>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-primary nav-cta-btn" href={`${DASHBOARD_URL}/login`}>Login / Signup</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;