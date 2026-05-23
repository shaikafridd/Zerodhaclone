import React from 'react';

function Team() {
    return (
        <div className='container p-3 p-md-5 mt-5 mb-5'>
            <div className='row mb-5'>
                <h1 className='fs-2 fw-semibold text-center'>People</h1>
            </div>
            <div className='row text-muted fs-5' style={{ lineHeight: "1.8" }}>
                <div className='col-12 col-md-6 p-3 p-md-5 text-center'>
                    <img src='media/images/nithinkAMATH.JPG' alt='Nithin Kamath' className='rounded-circle img-fluid mb-4' style={{ width: "60%", maxWidth: "300px" }} />
                    <h4 className='fw-medium text-dark'>Nithin Kamath</h4>
                    <p className='fs-6'>Founder, CEO</p>
                </div>
                <div className='col-12 col-md-6 p-3 p-md-5'>
                    <p>Nithin bootstrapped and founded Echo in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Echo has changed the landscape of the Indian broking industry.</p>
                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                    <p>Playing basketball is his zen.</p>
                    <p className='mt-4'>
                        <a href="https://nithinkamath.me" target="_blank" rel="noopener noreferrer" className='me-4' style={{textDecoration:"none", color:"#387ed1"}}>Connect on Homepage / TradingQnA / Twitter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;
