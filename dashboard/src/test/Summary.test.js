import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Summary from '../components/Summary';
import GeneralContext from '../components/GeneralContext';

// Mock axios
jest.mock('axios');

describe('Summary component', () => {
    const mockUser = { username: 'AFRID', balance: 150000.00 };
    const mockHoldings = [
        { avg: 100, qty: 10, price: 110 }, // investment = 1000, current = 1100, pnl = +100
        { avg: 200, qty: 5, price: 180 }  // investment = 1000, current = 900, pnl = -100
        // Total Investment = 2000, Total Current = 2000, Total Holdings PnL = 0
    ];
    const mockPositions = [
        { avg: 50, qty: 10, price: 55 } // pnl = (55 - 50) * 10 = +50
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockImplementation((url) => {
            if (url.includes('/allHoldings')) {
                return Promise.resolve({ data: mockHoldings });
            }
            if (url.includes('/allPositions')) {
                return Promise.resolve({ data: mockPositions });
            }
            return Promise.reject(new Error('Unknown URL'));
        });
    });

    test('renders user balance and initial greeting', async () => {
        render(
            <GeneralContext.Provider value={{ user: mockUser, refetchTrigger: 0 }}>
                <Summary />
            </GeneralContext.Provider>
        );

        expect(screen.getByText('Hi, AFRID')).toBeInTheDocument();
        expect(screen.getAllByText(/1,50,000.00/)[0]).toBeInTheDocument(); // balance rendered in en-IN style
    });

    test('fetches and displays holdings and positions data with correct P&L calculations', async () => {
        render(
            <GeneralContext.Provider value={{ user: mockUser, refetchTrigger: 0 }}>
                <Summary />
            </GeneralContext.Provider>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/allHoldings');
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/allPositions');
        });

        // Holdings Count
        expect(screen.getByRole('heading', { name: /Holdings \(2\)/i })).toBeInTheDocument();
        
        // P&L calculated as 2000 - 2000 = 0.00
        expect(screen.getByText('+0.00')).toBeInTheDocument();
        
        // Current value and Investment formatted with formatKOrValue (2000 currentValue -> 2.0k, 2000 totalInvestment -> 2.0k)
        expect(screen.getAllByText('₹ 2.0k')).toHaveLength(2);

        // Positions Count
        expect(screen.getByRole('heading', { name: /Positions \(1\)/i })).toBeInTheDocument();
        
        // Positions P&L calculated as (55 - 50) * 10 = +50 -> +50.00
        expect(screen.getByText('+50.00')).toBeInTheDocument();
    });

    test('handles api error gracefully without crashing', async () => {
        axios.get.mockRejectedValue(new Error('API failure'));

        render(
            <GeneralContext.Provider value={{ user: mockUser, refetchTrigger: 0 }}>
                <Summary />
            </GeneralContext.Provider>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
        });

        // Should still render and greet user
        expect(screen.getByText('Hi, AFRID')).toBeInTheDocument();
    });
});
