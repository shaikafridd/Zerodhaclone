import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../landing_page/signup/Signup';

describe('Signup Component', () => {
    let originalLocation;

    beforeAll(() => {
        originalLocation = window.location;
        delete window.location;
        window.location = { href: '' };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    test('renders redirecting message and performs redirect', () => {
        render(<Signup />);
        
        expect(screen.getByText(/Redirecting to signup.../i)).toBeInTheDocument();
        expect(window.location.href).toBe('http://localhost:3001/signup');
    });
});
