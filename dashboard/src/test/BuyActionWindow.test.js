import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BuyActionWindow from '../components/BuyActionWindow';
import GeneralContext from '../components/GeneralContext';

// Mock axios
jest.mock('axios');

describe('BuyActionWindow component', () => {
    const mockSelectedStock = { name: 'RELIANCE', symbol: 'RELIANCE.NS', price: 2500.00 };
    const mockUser = { username: 'testuser', balance: 10000.00 };

    const mockCloseWindow = jest.fn();
    const mockSetUser = jest.fn();
    const mockTriggerRefetch = jest.fn();

    const renderWindow = (contextOverrides = {}) => {
        const defaultContext = {
            closeWindow: mockCloseWindow,
            isBuyWindowOpen: false,
            isSellWindowOpen: false,
            selectedStock: null,
            user: mockUser,
            setUser: mockSetUser,
            triggerRefetch: mockTriggerRefetch,
            ...contextOverrides
        };

        return render(
            <GeneralContext.Provider value={defaultContext}>
                <BuyActionWindow />
            </GeneralContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders nothing when closed', () => {
        const { container } = renderWindow();
        expect(container.firstChild).toBeNull();
    });

    test('renders buy form when isBuyWindowOpen is true', () => {
        renderWindow({
            isBuyWindowOpen: true,
            selectedStock: mockSelectedStock
        });

        expect(screen.getByRole('heading', { name: /Buy RELIANCE/i })).toBeInTheDocument();
        expect(screen.getByText('Margin required ₹2500.00')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^Buy$/i })).toHaveClass('btn-blue');
    });

    test('renders sell form when isSellWindowOpen is true', () => {
        renderWindow({
            isSellWindowOpen: true,
            selectedStock: mockSelectedStock
        });

        expect(screen.getByRole('heading', { name: /Sell RELIANCE/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^Sell$/i })).toHaveClass('btn-red');
    });

    test('displays error when quantity is invalid', async () => {
        const { container } = renderWindow({
            isBuyWindowOpen: true,
            selectedStock: mockSelectedStock
        });

        const qtyInput = container.querySelector('#qty');
        fireEvent.change(qtyInput, { target: { value: '0' } });

        const buyBtn = screen.getByRole('button', { name: /^Buy$/i });
        fireEvent.click(buyBtn);

        expect(screen.getByText(/Quantity must be greater than 0/i)).toBeInTheDocument();
        expect(axios.post).not.toHaveBeenCalled();
    });

    test('displays error when price is invalid', async () => {
        const { container } = renderWindow({
            isBuyWindowOpen: true,
            selectedStock: mockSelectedStock
        });

        const priceInput = container.querySelector('#price');
        fireEvent.change(priceInput, { target: { value: '-5' } });

        const buyBtn = screen.getByRole('button', { name: /^Buy$/i });
        fireEvent.click(buyBtn);

        expect(screen.getByText(/Price must be greater than 0/i)).toBeInTheDocument();
    });

    test('displays error when user has insufficient funds for buy order', async () => {
        renderWindow({
            isBuyWindowOpen: true,
            selectedStock: mockSelectedStock,
            user: { ...mockUser, balance: 1000.00 } // only 1000 balance, reliance price is 2500
        });

        const buyBtn = screen.getByRole('button', { name: /^Buy$/i });
        fireEvent.click(buyBtn);

        expect(screen.getByText(/Insufficient funds to place this order/i)).toBeInTheDocument();
        expect(axios.post).not.toHaveBeenCalled();
    });

    test('successfully places buy order and updates user balance in context', async () => {
        axios.post.mockResolvedValueOnce({ data: 'Order placed' });

        renderWindow({
            isBuyWindowOpen: true,
            selectedStock: mockSelectedStock,
            user: mockUser
        });

        const buyBtn = screen.getByRole('button', { name: /^Buy$/i });
        
        await act(async () => {
            fireEvent.click(buyBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/newOrder', {
            name: 'RELIANCE',
            qty: 1,
            price: 2500.00,
            mode: 'BUY',
            product: 'MIS'
        });
        
        expect(mockSetUser).toHaveBeenCalledWith({
            ...mockUser,
            balance: 7500.00 // 10000 - 2500
        });
        expect(mockTriggerRefetch).toHaveBeenCalled();
        expect(mockCloseWindow).toHaveBeenCalled();
    });

    test('successfully places sell order and increases user balance in context', async () => {
        axios.post.mockResolvedValueOnce({ data: 'Order placed' });

        renderWindow({
            isSellWindowOpen: true,
            selectedStock: mockSelectedStock,
            user: mockUser
        });

        const sellBtn = screen.getByRole('button', { name: /^Sell$/i });
        
        await act(async () => {
            fireEvent.click(sellBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/newOrder', {
            name: 'RELIANCE',
            qty: 1,
            price: 2500.00,
            mode: 'SELL',
            product: 'MIS'
        });
        
        expect(mockSetUser).toHaveBeenCalledWith({
            ...mockUser,
            balance: 12500.00 // 10000 + 2500
        });
        expect(mockTriggerRefetch).toHaveBeenCalled();
        expect(mockCloseWindow).toHaveBeenCalled();
    });
});
