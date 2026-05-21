import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import WatchList from '../components/WatchList';
import GeneralContext from '../components/GeneralContext';

// Mock axios
jest.mock('axios');

// Mock DoughnutChart to prevent Canvas errors under JSDOM
jest.mock('../components/DoughnutChart', () => () => <div data-testid="mock-doughnut">Mock Doughnut Chart</div>);

describe('WatchList component', () => {
    const mockWatchlistData = [
        { name: 'RELIANCE', symbol: 'RELIANCE.NS', price: 2450.50, percent: '1.20%', isDown: false },
        { name: 'INFY', symbol: 'INFY.NS', price: 1510.00, percent: '-0.85%', isDown: true }
    ];

    const mockOpenBuyWindow = jest.fn();
    const mockOpenSellWindow = jest.fn();

    const renderWatchlist = (contextVal = {}) => {
        const defaultContext = {
            openBuyWindow: mockOpenBuyWindow,
            openSellWindow: mockOpenSellWindow,
            refetchTrigger: 0,
            ...contextVal
        };

        return render(
            <GeneralContext.Provider value={defaultContext}>
                <WatchList />
            </GeneralContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        axios.get.mockImplementation((url) => {
            if (url.includes('/watchlist')) {
                return Promise.resolve({ data: mockWatchlistData });
            }
            if (url.includes('/searchSymbol')) {
                return Promise.resolve({
                    data: [
                        { symbol: 'TCS.NS', name: 'TCS', exchange: 'NSE' },
                        { symbol: 'SBIN.NS', name: 'SBIN', exchange: 'NSE' }
                    ]
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        });
    });

    test('renders watchlist items successfully', async () => {
        renderWatchlist();

        // Check for loading and populated items
        await waitFor(() => {
            expect(screen.getByText('RELIANCE')).toBeInTheDocument();
            expect(screen.getByText('INFY')).toBeInTheDocument();
        });

        expect(screen.getByText('2450.50')).toBeInTheDocument();
        expect(screen.getByText('1510.00')).toBeInTheDocument();
        expect(screen.getByTestId('mock-doughnut')).toBeInTheDocument();
    });

    test('searches and shows autocomplete results', async () => {
        jest.useFakeTimers();
        renderWatchlist();

        const searchInput = screen.getByPlaceholderText(/Search eg: infy/i);
        
        fireEvent.change(searchInput, { target: { value: 'TCS' } });

        // Fast-forward debounce timer
        act(() => {
            jest.advanceTimersByTime(300);
        });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/searchSymbol?q=TCS');
            expect(screen.getByText('TCS.NS')).toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    test('adds a stock to the watchlist', async () => {
        jest.useFakeTimers();
        axios.post.mockResolvedValueOnce({ success: true });
        
        renderWatchlist();

        const searchInput = screen.getByPlaceholderText(/Search eg: infy/i);
        fireEvent.change(searchInput, { target: { value: 'TCS' } });

        act(() => {
            jest.advanceTimersByTime(300);
        });

        await waitFor(() => {
            expect(screen.getByText('TCS.NS')).toBeInTheDocument();
        });

        const addBtn = screen.getAllByRole('button', { name: /^Add$/i })[0];
        
        await act(async () => {
            fireEvent.click(addBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/watchlist/add', { symbol: 'TCS.NS' });
        jest.useRealTimers();
    });

    test('removes a stock from the watchlist', async () => {
        axios.post.mockResolvedValueOnce({ success: true });

        renderWatchlist();

        await waitFor(() => {
            expect(screen.getByText('RELIANCE')).toBeInTheDocument();
        });

        const deleteRelianceBtn = screen.getAllByRole('button', { name: /Remove Stock/i })[0];

        await act(async () => {
            fireEvent.click(deleteRelianceBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/watchlist/remove', { symbol: 'RELIANCE.NS' });
    });

    test('toggles favorite status and updates local storage', async () => {
        renderWatchlist();

        await waitFor(() => {
            expect(screen.getByText('RELIANCE')).toBeInTheDocument();
        });

        const favRelianceBtn = screen.getAllByRole('button', { name: /Favorite/i })[0];

        // Click to add to favorite
        fireEvent.click(favRelianceBtn);
        expect(localStorage.getItem('watchlist_favorites')).toContain('RELIANCE');

        // Click again to remove
        fireEvent.click(favRelianceBtn);
        expect(localStorage.getItem('watchlist_favorites')).not.toContain('RELIANCE');
    });

    test('triggers openBuyWindow and openSellWindow on button clicks', async () => {
        renderWatchlist();

        await waitFor(() => {
            expect(screen.getByText('RELIANCE')).toBeInTheDocument();
        });

        const buyBtn = screen.getAllByRole('button', { name: /Buy/i })[0];
        const sellBtn = screen.getAllByRole('button', { name: /Sell/i })[0];

        fireEvent.click(buyBtn);
        expect(mockOpenBuyWindow).toHaveBeenCalledWith(mockWatchlistData[0]);

        fireEvent.click(sellBtn);
        expect(mockOpenSellWindow).toHaveBeenCalledWith(mockWatchlistData[0]);
    });
});
