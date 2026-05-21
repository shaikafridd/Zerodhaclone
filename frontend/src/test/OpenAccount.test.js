import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OpenAccount from '../OpenAccount';

describe('OpenAccount component', () => {
    test('renders structural elements and text successfully', () => {
        render(<OpenAccount />);
        
        // Check for main heading
        const headingElement = screen.getByRole('heading', { name: /Open A Zerodha Account/i });
        expect(headingElement).toBeInTheDocument();

        // Check for description paragraph
        const descriptionElement = screen.getByText(/Modern platforms and apps, ₹0 investments, and flat ₹20 intraday/i);
        expect(descriptionElement).toBeInTheDocument();

        // Check for Sign Up button/link with correct href
        const signUpLink = screen.getByRole('link', { name: /Sign Up Now/i });
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute('href', 'http://localhost:3001/signup');
    });
});
