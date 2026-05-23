import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage from '../landing_page/product/ProductPage';
import Leftimage from '../landing_page/product/Leftimage';
import Rightimage from '../landing_page/product/Rightimage';
import Hero from '../landing_page/product/Hero';
import Universe from '../landing_page/product/Universe';

describe('ProductPage and its Subcomponents', () => {
    test('renders Hero component successfully', () => {
        render(<Hero />);
        expect(screen.getByRole('heading', { name: /Technology/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Sleek, modern, and intuitive trading platforms/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /investment offerings/i })).toBeInTheDocument();
    });

    test('renders Leftimage component successfully', () => {
        render(
            <Leftimage
                imageURL="test_kite.png"
                productName="Kite"
                productDescription="Kite test description"
                tryDemo="#demo"
                learnMore="#learn"
                googlePlay="#play"
                appStore="#app"
            />
        );

        expect(screen.getByRole('heading', { name: /Kite/i })).toBeInTheDocument();
        expect(screen.getByText('Kite test description')).toBeInTheDocument();
        
        const image = screen.getByAltText('Kite');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test_kite.png');

        expect(screen.getByRole('link', { name: /Try Demo/i })).toHaveAttribute('href', '#demo');
        expect(screen.getByRole('link', { name: /Learn More/i })).toHaveAttribute('href', '#learn');
        
        expect(screen.getByAltText('Google Play').closest('a')).toHaveAttribute('href', '#play');
        expect(screen.getByAltText('App Store').closest('a')).toHaveAttribute('href', '#app');
    });

    test('renders Rightimage component successfully', () => {
        render(
            <Rightimage
                imageURL="test_console.png"
                productName="Console"
                productDescription="Console test description"
                learnMore="#learn_console"
            />
        );

        expect(screen.getByRole('heading', { name: /Console/i })).toBeInTheDocument();
        expect(screen.getByText('Console test description')).toBeInTheDocument();
        
        const image = screen.getByAltText('Console');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test_console.png');

        expect(screen.getByRole('link', { name: /Learn More/i })).toHaveAttribute('href', '#learn_console');
    });

    test('renders Universe component successfully', () => {
        render(<Universe />);
        expect(screen.getByRole('heading', { name: /The Aero Universe/i })).toBeInTheDocument();
        expect(screen.getByAltText('Smallcase')).toBeInTheDocument();
        expect(screen.getByAltText('Streak')).toBeInTheDocument();
        expect(screen.getByAltText('Sensibull')).toBeInTheDocument();
        expect(screen.getByAltText('Aero Fundhouse')).toBeInTheDocument();
        expect(screen.getByAltText('GoldenPi')).toBeInTheDocument();
        expect(screen.getByAltText('Ditto')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up Now/i })).toBeInTheDocument();
    });

    test('renders complete ProductPage composition successfully', () => {
        render(<ProductPage />);
        // Check if various product sections are all rendered on the main page
        expect(screen.getByRole('heading', { name: /Technology/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Aero$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Aero Console$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Coin$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Aero Connect API$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Varsity mobile$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /The Aero Universe/i })).toBeInTheDocument();
        expect(screen.getByText(/Want to know more about our technology stack?/i)).toBeInTheDocument();
    });
});
