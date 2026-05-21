import React from 'react';
import { DASHBOARD_URL } from '../../config';

function Signup() {
    // Redirect to the dashboard signup page
    window.location.href = `${DASHBOARD_URL}/signup`;
    return (
        <div className="text-center p-5">
            <p>Redirecting to signup...</p>
        </div>
    );
}

export default Signup;
