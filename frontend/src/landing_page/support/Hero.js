import React from 'react';

function Hero() {
  return (
    <section className="container-fluid" id="supportHero" style={{ backgroundColor: '#387ed1', color: 'white', paddingBottom: '100px', paddingTop: '50px' }}>
      <div className="container p-5">
        <div className="row d-flex justify-content-between align-items-center mb-5">
          <div className="col-md-6 fs-4 fw-semibold">
            Support Portal
          </div>
          <div className="col-md-6 text-md-end text-start fs-6">
            <a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline mx-3" style={{ textUnderlineOffset: '4px' }}>Track tickets</a>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-7 mb-4">
            <h1 className="fs-4 mb-4 fw-normal">Search for an answer or browse help topics to create a ticket</h1>
            <div className="input-group mb-4 shadow-sm" style={{ borderRadius: '4px', overflow: 'hidden' }}>
              <input 
                type="text" 
                className="form-control p-3 border-0" 
                placeholder="Eg: how do i activate F&amp;O, why is my order getting rejected ..." 
                style={{ fontSize: '16px' }}
              />
              <span className="input-group-text bg-white border-0 px-4" style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-magnifying-glass fs-5 text-muted"></i>
              </span>
            </div>
            <div className="d-flex flex-wrap gap-4 mt-4" style={{ fontSize: '15px' }}>
              <a href="https://support.zerodha.com/category/account-opening" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Track account opening</a>
              <a href="https://support.zerodha.com/category/your-zerodha-account/login-credentials" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Track segment activation</a>
              <a href="https://zerodha.com/margin-calculator/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Intraday margins</a>
              <a href="https://kite.trade/docs/kite/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Kite user manual</a>
            </div>
          </div>
          <div className="col-md-5 p-md-4 ps-md-5 mt-4 mt-md-0">
            <h2 className="fs-4 mb-4 fw-normal">Featured</h2>
            <ol className="ms-3" style={{ lineHeight: '2.2' }}>
              <li><a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Surveillance measure on scrips - May 2024</a></li>
              <li className="mt-3"><a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline" style={{ textUnderlineOffset: '4px' }}>Latest Intraday leverages and Square-off timings</a></li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
