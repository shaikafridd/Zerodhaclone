import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from '../App';
import GeneralContext from '../components/GeneralContext';

// Mock axios
jest.mock('axios');

describe('App component', () => {
    test('renders authentication checking state initially', () => {
        axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves to keep loading state
        
        // Mock GeneralContext provider
        const mockUser = null;
        const setUser = jest.fn();
        const refetchTrigger = 0;
        const triggerRefetch = jest.fn();

        render(
            <GeneralContext.Provider value={{ user: mockUser, setUser, refetchTrigger, triggerRefetch }}>
                <App />
            </GeneralContext.Provider>
        );

        expect(screen.getByText(/Checking authentication.../i)).toBeInTheDocument();
    });
});
