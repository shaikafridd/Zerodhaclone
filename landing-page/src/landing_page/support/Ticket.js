import React from 'react';

function Ticket() {
  return (
    <div className="container p-5 mt-5 mb-5">
      <h2 className="fs-4 text-muted fw-normal mb-5 pb-4">To create a ticket, select a relevant topic</h2>
      
      <div className="row mb-5 pb-4">
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-solid fa-circle-plus fs-5 me-2" style={{ color: '#424242' }}></i> Account Opening</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Getting started</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Online</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Offline</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Charges</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Company, Partnership and HUF</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Non Resident Indian (NRI)</a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-regular fa-user fs-5 me-2" style={{ color: '#424242' }}></i> Your Aero Account</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Login credentials</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Your Profile</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Account modification and segment addition</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>CMR & DP ID</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Nomination</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Transfer and conversion of shares</a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-solid fa-chart-line fs-5 me-2" style={{ color: '#424242' }}></i> Trading and Markets</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Trading FAQs</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Aero</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Margins</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Product and order types</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Corporate actions</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Aero features</a>
          </div>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-solid fa-wallet fs-5 me-2" style={{ color: '#424242' }}></i> Funds</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Fund withdrawal</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Adding funds</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Adding bank accounts</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>eMandates</a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-solid fa-circle-notch fs-5 me-2" style={{ color: '#424242' }}></i> Aero Console</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>IPO</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Portfolio</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Funds statement</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Profile</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Reports</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Referral program</a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h3 className="fs-5 mb-4 fw-normal"><i className="fa-solid fa-coins fs-5 me-2" style={{ color: '#424242' }}></i> Aero Coin</h3>
          <div className="d-flex flex-column gap-3 ps-4 ms-2" style={{ fontSize: '15px' }}>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Understanding mutual funds and Aero Coin</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Aero Coin app</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Aero Coin web</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>Transactions and reports</a>
            <a href="https://support.aero.com" className="text-decoration-none" style={{ color: '#387ed1' }}>National Pension Scheme (NPS)</a>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Ticket;
