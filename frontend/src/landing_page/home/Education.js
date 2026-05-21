import React from 'react';
import { Link } from 'react-router-dom';

function Education() {
    return (
        <div className='container mt-5'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 p-3 text-center'>
                    <img src='media/images/education.svg' style={{ width: "70%" }} className='img-fluid mb-4' alt='Education' />
                </div>
                <div className='col-12 col-md-6 p-3'>
                    <h1 className='mb-3 fs-2 fw-semibold'>Free And Open Market Education</h1>
                    <p className='text-muted'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <Link to='' className='text-primary fw-medium' style={{ textDecoration: "none" }}>Varsity <i className="fa-solid fa-arrow-right"></i></Link>
                    <h1 className='mb-3 fs-2 fw-semibold mt-5'>TradingQ&A</h1>
                    <p className='text-muted'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <Link to='' className='text-primary fw-medium' style={{ textDecoration: "none" }}>TradingQ&A <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    );
}

export default Education;