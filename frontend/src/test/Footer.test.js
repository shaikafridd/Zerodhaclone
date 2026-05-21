import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer component', () => {
    test('renders logo, section headings, links and disclaimer successfully', () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        // Check for Logo image in footer
        const logoImage = screen.getByAltText('logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', 'media/images/logo.svg');

        // Check for column headers/text
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();
        expect(screen.getByText('Account')).toBeInTheDocument();

        // Check for copyright text
        expect(screen.getByText(/2010 - 2026, Zerodha Broking Ltd/i)).toBeInTheDocument();

        // Check for a few links in each section
        const openDematLink = screen.getByRole('link', { name: /Open demat account/i });
        expect(openDematLink).toBeInTheDocument();

        const upcomingIposLink = screen.getByRole('link', { name: /Upcoming IPOs/i });
        expect(upcomingIposLink).toBeInTheDocument();

        const aboutLink = screen.getByRole('link', { name: /About/i });
        expect(aboutLink).toBeInTheDocument();

        // Check for a part of the disclaimer text
        expect(screen.getByText(/Attention investors: 1\) Stock brokers can accept securities/i)).toBeInTheDocument();
    });
});
