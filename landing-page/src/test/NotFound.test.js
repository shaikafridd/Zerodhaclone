import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound component', () => {
    test('renders 404 header, subtext and home button link successfully', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        // Check for 404 header
        const headingElement = screen.getByRole('heading', { name: /404 Not Found/i });
        expect(headingElement).toBeInTheDocument();

        // Check for subtext
        const textElement = screen.getByText(/Sorry, the page you are looking for does not exist/i);
        expect(textElement).toBeInTheDocument();

        // Check for Go Home link
        const homeLink = screen.getByRole('link', { name: /Go Home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });
});
