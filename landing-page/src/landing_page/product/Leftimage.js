import React from 'react';

function Leftimage({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className='container mt-5 p-3 p-md-5'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 p-3 p-md-5 text-center'>
                    <img src={imageURL} className='img-fluid' alt={productName} />
                </div>
                <div className='col-12 col-md-6 p-3 p-md-5'>
                    <h1 className='fs-2 fw-semibold mb-4'>{productName}</h1>
                    <p className='text-muted fs-5 mb-4' style={{ lineHeight: "1.8" }}>{productDescription}</p>
                    <div className='mb-4'>
                        {tryDemo && <a href={tryDemo} style={{textDecoration:"none"}} className='me-5'>Try Demo <i className="fa-solid fa-arrow-right"></i></a>}
                        {learnMore && <a href={learnMore} style={{textDecoration:"none"}}>Learn More <i className="fa-solid fa-arrow-right"></i></a>}
                    </div>
                    <div>
                        {googlePlay && <a href={googlePlay}><img src='media/images/googlePlayBadge.svg' alt='Google Play' /></a>}
                        {appStore && <a href={appStore} className='ms-3'><img src='media/images/appstoreBadge.svg' alt='App Store' /></a>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leftimage;
