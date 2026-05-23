import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../landing_page/about/AboutPage';

describe('AboutPage component', () => {
    test('renders about page sections successfully', () => {
        render(<AboutPage />);

        // Check for Hero title in About section
        const heroTitle = screen.getByRole('heading', { name: /We pioneered the discount broking model in India/i });
        expect(heroTitle).toBeInTheDocument();

        // Check for Team title
        const teamTitle = screen.getByRole('heading', { name: /People/i });
        expect(teamTitle).toBeInTheDocument();

        // Check for CEO name and title
        const ceoName = screen.getByRole('heading', { name: /Nithin Kamath/i });
        expect(ceoName).toBeInTheDocument();
        expect(screen.getByText('Founder, CEO')).toBeInTheDocument();

        // Check for CEO profile image
        const ceoImage = screen.getByAltText('Nithin Kamath');
        expect(ceoImage).toBeInTheDocument();
        expect(ceoImage).toHaveAttribute('src', 'media/images/nithinkAMATH.JPG');
    });
});
