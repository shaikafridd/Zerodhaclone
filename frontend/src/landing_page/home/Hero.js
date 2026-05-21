import React from 'react';

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <div className='col-12'>
                    <img src='media/images/homeHero.png' alt='Hero Image' className='img-fluid mb-5' />
                    <h1 className='mt-5 display-4 fw-semibold'>Invest in everything</h1>
                    <p className='fs-5 text-muted mb-4'>Online Platform To Invest In Stocks, Derivatives, Mutual Funds, and More</p>
                    <a href='http://localhost:3001/signup' className='p-2 btn btn-primary fs-5 mb-5' style={{ minWidth: "200px", textDecoration: "none" }}>Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Hero;
