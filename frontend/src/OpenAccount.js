import React from 'react';
import { DASHBOARD_URL } from './config';

function OpenAccount() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <div className='col-12'>
                    <h1 className='mt-5 display-4 fw-semibold'>Open A Zerodha Account</h1>
                    <p className='fs-5 text-muted mb-4'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                    <a href={`${DASHBOARD_URL}/signup`} className='p-2 btn btn-primary fs-5 mb-5' style={{ minWidth: "200px", textDecoration: "none" }}>Sign Up Now</a>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
