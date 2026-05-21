import React from 'react';

function Signup() {
    // Redirect to the dashboard signup page
    window.location.href = "http://localhost:3001/signup";
    return (
        <div className="text-center p-5">
            <p>Redirecting to signup...</p>
        </div>
    );
}

export default Signup;
