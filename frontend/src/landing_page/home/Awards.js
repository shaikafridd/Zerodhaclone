import React from 'react';

function Awards() {
    return (
        <div className='container mt-5'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 p-3 p-md-5 text-center'>
                    <img src='media/images/largestBroker.svg' className='img-fluid' alt='Largest Broker' />
                </div>
                <div className='col-12 col-md-6 p-3 p-md-5 mt-4 mt-md-0'>
                    <h1 className='fs-2 fw-semibold mb-3'>Largest Stock Broker In India</h1>
                    <p className='mb-4 text-muted'>2+ Million Zerodha Clients Contribute To Over 15% Of All Retail Order Volumes In India Daily By Trading And Investing In: </p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul className='text-muted' style={{ lineHeight: "2.5" }}>
                                <li>Futures And Options</li>
                                <li>Commodity Derivatives</li>
                                <li>Currency Derivatives</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul className='text-muted' style={{ lineHeight: "2.5" }}>
                                <li>Stocks And IPOs</li>
                                <li>Direct Mutual Funds</li>
                                <li>Bonds And Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <img src='media/images/pressLogos.png' style={{ width: "90%" }} className='mt-4 img-fluid' alt='Press Logos' />
                </div>
            </div>
        </div>
    );
}

export default Awards;