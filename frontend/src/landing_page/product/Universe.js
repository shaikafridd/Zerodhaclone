import React from 'react';

function Universe() {
    return (
        <div className='container mt-5 p-3 p-md-5 text-center'>
            <div className='row mb-5'>
                <h1 className='fs-2 fw-semibold'>The Zerodha Universe</h1>
                <p className='text-muted mt-3 fs-5'>Extend your trading and investment experience even further, with our partner platforms</p>
            </div>
            
            <div className='row mt-5 p-md-5 g-5 text-muted'>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/smallcaseLogo.png' style={{width: "150px"}} alt='Smallcase' className='mb-3' />
                    <p className='fs-6'>Thematic investing platform<br/>that helps you invest in diversified<br/>baskets of stocks on ETFs.</p>
                </div>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/streakLogo.png' style={{width: "150px"}} alt='Streak' className='mb-3' />
                    <p className='fs-6'>Systematic trading platform<br/>that allows you to create and backtest<br/>strategies without coding.</p>
                </div>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/sensibullLogo.svg' style={{width: "180px"}} alt='Sensibull' className='mb-3' />
                    <p className='fs-6'>Options trading platform<br/>that lets you create strategies,<br/>analyze options, and trade.</p>
                </div>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/zerodhaFundhouse.png' style={{width: "180px"}} alt='Zerodha Fundhouse' className='mb-3' />
                    <p className='fs-6'>Our asset management venture<br/>that is creating simple and transparent<br/>index funds to help you save for your goals.</p>
                </div>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/goldenpiLogo.png' style={{width: "150px"}} alt='GoldenPi' className='mb-3' />
                    <p className='fs-6'>Investment research platform<br/>that offers detailed insights on stocks,<br/>sectors, supply chains, and more.</p>
                </div>
                <div className='col-12 col-sm-6 col-md-4 p-3'>
                    <img src='media/images/dittoLogo.png' style={{width: "120px"}} alt='Ditto' className='mb-3' />
                    <p className='fs-6'>Personalized advice on life<br/>and health insurance. No spam<br/>and no mis-selling.</p>
                </div>
            </div>
            
            <div className='row mt-5 mb-5 justify-content-center'>
                <button className='p-2 btn btn-primary fs-5' style={{ minWidth: "200px", maxWidth: "250px" }}>Sign Up Now</button>
            </div>
        </div>
    );
}

export default Universe;
