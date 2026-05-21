import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';
import GeneralContext from '../components/GeneralContext';

// Mock axios and useNavigate
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock child components
jest.mock('../components/TopBar', () => () => <div data-testid="topbar">TopBar Mock</div>);
jest.mock('../components/Dashboard', () => () => <div data-testid="dashboard">Dashboard Mock</div>);

describe('Home component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('redirects to /login if authentication fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Unauthorized'));

        const setUser = jest.fn();
        const contextValue = { setUser, refetchTrigger: 0 };

        render(
            <MemoryRouter>
                <GeneralContext.Provider value={contextValue}>
                    <Home />
                </GeneralContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Checking authentication.../i)).toBeInTheDocument();

        // Wait for checkAuth call to resolve
        await act(async () => {
            await Promise.resolve();
        });

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('renders TopBar and Dashboard if authentication succeeds', async () => {
        const mockUser = { username: 'testuser', balance: 100000 };
        axios.get.mockResolvedValueOnce({
            data: { success: true, user: mockUser }
        });

        const setUser = jest.fn();
        const contextValue = { setUser, refetchTrigger: 0 };

        render(
            <MemoryRouter>
                <GeneralContext.Provider value={contextValue}>
                    <Home />
                </GeneralContext.Provider>
            </MemoryRouter>
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(setUser).toHaveBeenCalledWith(mockUser);
        expect(screen.getByTestId('topbar')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
});
