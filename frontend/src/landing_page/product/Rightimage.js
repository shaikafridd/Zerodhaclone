import React from 'react';

function Rightimage({ imageURL, productName, productDescription, learnMore }) {
    return (
        <div className='container mt-5 p-3 p-md-5'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 p-3 p-md-5 order-2 order-md-1'>
                    <h1 className='fs-2 fw-semibold mb-4'>{productName}</h1>
                    <p className='text-muted fs-5 mb-4' style={{ lineHeight: "1.8" }}>{productDescription}</p>
                    <div>
                        {learnMore && <a href={learnMore} style={{textDecoration:"none"}}>Learn More <i className="fa-solid fa-arrow-right"></i></a>}
                    </div>
                </div>
                <div className='col-12 col-md-6 p-3 p-md-5 text-center order-1 order-md-2'>
                    <img src={imageURL} className='img-fluid' alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default Rightimage;
