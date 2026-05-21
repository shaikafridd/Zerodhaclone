import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Supportpage from '../landing_page/support/Supportpage';
import Hero from '../landing_page/support/Hero';
import Ticket from '../landing_page/support/Ticket';

describe('SupportPage and its Subcomponents', () => {
    test('renders Support Hero component successfully', () => {
        render(<Hero />);
        
        expect(screen.getByText('Support Portal')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Track tickets/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Search for an answer or browse help topics to create a ticket/i })).toBeInTheDocument();
        
        const searchInput = screen.getByPlaceholderText(/Eg: how do i activate F&O, why is my order getting rejected/i);
        expect(searchInput).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /Track account opening/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Track segment activation/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Intraday margins/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Kite user manual/i })).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /Featured/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Surveillance measure on scrips - May 2024/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Latest Intraday leverages and Square-off timings/i })).toBeInTheDocument();
    });

    test('renders Ticket component successfully', () => {
        render(<Ticket />);
        
        expect(screen.getByRole('heading', { name: /To create a ticket, select a relevant topic/i })).toBeInTheDocument();
        
        // Topics Check
        expect(screen.getByRole('heading', { name: /Account Opening/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Your Zerodha Account/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Trading and Markets/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Funds/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Console/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Coin/i })).toBeInTheDocument();

        // Sublinks Check
        expect(screen.getByRole('link', { name: /Getting started/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Login credentials/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Trading FAQs/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Fund withdrawal/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /IPO/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Understanding mutual funds and Coin/i })).toBeInTheDocument();
    });

    test('renders Supportpage composition successfully', () => {
        render(<Supportpage />);
        
        expect(screen.getByText('Support Portal')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /To create a ticket, select a relevant topic/i })).toBeInTheDocument();
    });
});
