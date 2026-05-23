import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from '../landing_page/home/Hero';

//test suite

describe('Hero component', () => {
    test('renders heroimage', () => {
        render(<Hero />);
        const heroimage = screen.getByAltText("Echo trading and investment platform illustration");
        expect(heroimage).toBeInTheDocument();
        expect(heroimage).toHaveAttribute("src", "media/images/homeHero.png");
    });
});
