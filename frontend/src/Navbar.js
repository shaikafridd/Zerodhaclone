import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg sticky-top py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #eaeaea" }}>
            <div class="container">
                <Link class="navbar-brand d-flex align-items-center" to="/">
                    <img src='media/images/logo.svg' style={{ width: "120px" }} alt='logo' />
                </Link>
                <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center mt-3 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="/about">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/product">Product</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/support">Support</Link>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-primary nav-cta-btn" href="http://localhost:3001/login">Login / Signup</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;