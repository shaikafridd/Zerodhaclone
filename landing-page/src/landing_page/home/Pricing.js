import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
    return (
        <div className='container my-5 py-5'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-5 mb-5 mb-md-0'>
                    <h1 className='mb-3 fs-2 fw-semibold'>Unbeatable Pricing</h1>
                    <p className='text-muted fs-5 mb-4'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <Link to='/pricing' className='text-primary fw-medium' style={{ textDecoration: "none" }}>See Pricing <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
                <div className='col-12 col-md-1'></div>
                <div className='col-12 col-md-6'>
                    <div className='row text-center g-4'>
                        <div className='col-12 col-sm-6'>
                            <div className='p-4 pricing-card h-100 d-flex flex-column justify-content-center'>
                                <h1 className='mb-3 fw-bold text-warning'>₹0</h1>
                                <p className='text-muted mb-0'>Free Equity Delivery And <br/> Direct Mutual Funds</p>
                            </div>
                        </div>
                        <div className='col-12 col-sm-6'>
                            <div className='p-4 pricing-card h-100 d-flex flex-column justify-content-center'>
                                <h1 className='mb-3 fw-bold text-info'>₹20</h1>
                                <p className='text-muted mb-0'>Intraday and F&O</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
