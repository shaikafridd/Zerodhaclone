import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar component', () => {
    test('renders logo and navigation links successfully', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // Check for Logo image and its alt text
        const logoImage = screen.getByAltText('logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', 'media/images/logo.svg');

        // Check for links
        const aboutLink = screen.getByRole('link', { name: /About/i });
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute('href', '/about');

        const productLink = screen.getByRole('link', { name: /Product/i });
        expect(productLink).toBeInTheDocument();
        expect(productLink).toHaveAttribute('href', '/product');

        const pricingLink = screen.getByRole('link', { name: /Pricing/i });
        expect(pricingLink).toBeInTheDocument();
        expect(pricingLink).toHaveAttribute('href', '/pricing');

        const supportLink = screen.getByRole('link', { name: /Support/i });
        expect(supportLink).toBeInTheDocument();
        expect(supportLink).toHaveAttribute('href', '/support');

        // Check for CTA Signup / Login button
        const loginSignupLink = screen.getByRole('link', { name: /Login \/ Signup/i });
        expect(loginSignupLink).toBeInTheDocument();
        expect(loginSignupLink).toHaveAttribute('href', 'http://localhost:3001/login');
    });
});
