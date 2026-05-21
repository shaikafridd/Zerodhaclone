import React from 'react';

function Hero() {
    return (
        <div className='container text-center mt-5 p-3 p-md-5 border-bottom mb-5'>
            <h1 className='mt-5 fs-1 fw-bold'>Technology</h1>
            <h3 className='text-muted mt-3 fs-4 fw-normal'>Sleek, modern, and intuitive trading platforms</h3>
            <p className='mt-3 mb-5'>Check out our <a href="#" style={{textDecoration:"none"}}>investment offerings <i className="fa-solid fa-arrow-right"></i></a></p>
        </div>
    );
}

export default Hero;
