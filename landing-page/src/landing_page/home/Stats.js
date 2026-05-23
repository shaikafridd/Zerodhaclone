import React from 'react';
import { Link } from 'react-router-dom';

function Stats() {
    return (
        <div className='container p-3'>
            <div className='row p-5 align-items-center'>
                <div className='col-12 col-md-6 p-3 p-md-5'>
                    <h1 className='fs-2 mb-5 fw-semibold'>Trust With Confidence</h1>
                    <h2 className='fs-4 fw-medium'>Customer-First Always</h2>
                    <p className='text-muted mb-4'>
                        That's why 1.6+ crore customers trust Aero with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
                    </p>
                    <h2 className='fs-4 fw-medium'>No spam or gimmicks</h2>
                    <p className='text-muted mb-4'>
                        No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
                    </p>
                    <h2 className='fs-4 fw-medium'>The Aero universe</h2>
                    <p className='text-muted mb-4'>
                        Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
                    </p>
                    <h2 className='fs-4 fw-medium'>Do better with money</h2>
                    <p className='text-muted mb-4'>
                        With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
                    </p>
                </div>
                <div className='col-12 col-md-6 p-3 p-md-5 text-center'>
                    <img src='media/images/ecosystem.png' style={{ width: "90%" }} className='img-fluid mb-4' alt='Ecosystem' />
                    <div className='text-center d-flex flex-column flex-md-row justify-content-center align-items-center gap-3'>
                        <Link to='/product' className='text-primary fw-medium' style={{ textDecoration: "none" }}>Explore Our Products <i className="fa-solid fa-arrow-right"></i></Link>
                        <Link to='/signup' className='text-primary fw-medium' style={{ textDecoration: "none" }}>Try Aero Demo <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;