import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pricingpage from '../landing_page/pricing/Pricingpage';

describe('Pricing Page', () => {
    test('renders Pricing Page components successfully', () => {
        render(
            <BrowserRouter>
                <Pricingpage />
            </BrowserRouter>
        );

        // From Hero
        expect(screen.getByRole('heading', { name: /^Pricing$/i })).toBeInTheDocument();
        expect(screen.getByText('Free equity investments and flat ₹20 intraday and F&O trades')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Free equity delivery/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Intraday and F&O trades/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Free direct MF/i })).toBeInTheDocument();

        // From OpenAccount
        expect(screen.getByRole('heading', { name: /Open an Aero Account/i })).toBeInTheDocument();

        // From Brokerage
        expect(screen.getByRole('heading', { name: /Brokerage calculator/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /List of charges/i })).toBeInTheDocument();
        expect(screen.getByText(/RMS auto-squareoff: Additional charges of ₹50 \+ GST/i)).toBeInTheDocument();
    });
});
