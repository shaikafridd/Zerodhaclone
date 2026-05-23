import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Awards from '../landing_page/home/Awards';
import Education from '../landing_page/home/Education';
import Pricing from '../landing_page/home/Pricing';
import Stats from '../landing_page/home/Stats';

describe('Home Page Sub-Components', () => {
    test('renders Awards component successfully', () => {
        render(<Awards />);
        
        expect(screen.getByRole('heading', { name: /Largest Stock Broker In India/i })).toBeInTheDocument();
        expect(screen.getByAltText('Largest Broker')).toBeInTheDocument();
        expect(screen.getByText('Futures And Options')).toBeInTheDocument();
        expect(screen.getByText('Stocks And IPOs')).toBeInTheDocument();
    });

    test('renders Education component successfully', () => {
        render(
            <BrowserRouter>
                <Education />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: /Free And Open Market Education/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /TradingQ&A/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Varsity/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /TradingQ&A/i })).toBeInTheDocument();
    });

    test('renders Pricing component successfully', () => {
        render(
            <BrowserRouter>
                <Pricing />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: /Unbeatable Pricing/i })).toBeInTheDocument();
        expect(screen.getByText('₹0')).toBeInTheDocument();
        expect(screen.getByText('₹20')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /See Pricing/i })).toHaveAttribute('href', '/pricing');
    });

    test('renders Stats component successfully', () => {
        render(
            <BrowserRouter>
                <Stats />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: /Trust With Confidence/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Customer-First Always/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /No spam or gimmicks/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Explore Our Products/i })).toHaveAttribute('href', '/product');
        expect(screen.getByRole('link', { name: /Try Echo Demo/i })).toHaveAttribute('href', '/signup');
    });
});
