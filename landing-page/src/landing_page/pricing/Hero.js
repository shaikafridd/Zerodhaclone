import React from 'react';

function Hero() {
    return (
        <div className="container p-5 mt-5">
            <div className="row text-center mt-5 mb-5">
                <h1 className="display-4 fw-bold mb-4" style={{ color: '#424242' }}>Pricing</h1>
                <p className="fs-5 text-muted mb-5">Free equity investments and flat ₹20 intraday and F&O trades</p>
            </div>
            <div className="row text-center mt-5 pt-5 border-top">
                <div className="col-lg-4 col-md-6 mb-5">
                    <img src="https://zerodha.com/static/images/pricing-eq.svg" alt="Free Equity" className="img-fluid mb-4" style={{ height: '140px' }} />
                    <h2 className="fs-4 fw-semibold mb-3">Free equity delivery</h2>
                    <p className="text-muted px-4" style={{ lineHeight: '1.8' }}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col-lg-4 col-md-6 mb-5">
                    <img src="https://zerodha.com/static/images/other-trades.svg" alt="Intraday Trades" className="img-fluid mb-4" style={{ height: '140px' }} />
                    <h2 className="fs-4 fw-semibold mb-3">Intraday and F&O trades</h2>
                    <p className="text-muted px-4" style={{ lineHeight: '1.8' }}>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col-lg-4 col-md-6 mb-5">
                    <img src="https://zerodha.com/static/images/pricing-eq.svg" alt="Free Direct MF" className="img-fluid mb-4" style={{ height: '140px' }} />
                    <h2 className="fs-4 fw-semibold mb-3">Free direct MF</h2>
                    <p className="text-muted px-4" style={{ lineHeight: '1.8' }}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
