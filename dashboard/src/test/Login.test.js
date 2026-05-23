import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

// Mock axios
jest.mock('axios');

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/login' };

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}));

describe('Login component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockLocation.pathname = '/login';
    });

    test('renders login form by default', () => {
        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /Login to Echo/i })).toBeInTheDocument();
        expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
        expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
        expect(container.querySelector('input[type="text"]')).not.toBeInTheDocument();
    });

    test('renders signup form when location pathname is /signup', () => {
        mockLocation.pathname = '/signup';
        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /Create Account/i })).toBeInTheDocument();
        expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    test('successful login submits details and redirects', async () => {
        axios.post.mockResolvedValueOnce({
            data: { success: true, message: 'Login successful' }
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitBtn = screen.getByRole('button', { name: /Login/i });

        fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/login', {
            email: 'user@test.com',
            password: 'password123',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('failed login displays error message', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } }
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitBtn = screen.getByRole('button', { name: /Login/i });

        fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('successful signup submits details and redirects', async () => {
        mockLocation.pathname = '/signup';
        axios.post.mockResolvedValueOnce({
            data: { success: true, message: 'Signup successful' }
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = container.querySelector('input[type="text"]');
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitBtn = screen.getByRole('button', { name: /Sign Up/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        await act(async () => {
            fireEvent.click(submitBtn);
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/signup', {
            username: 'testuser',
            email: 'user@test.com',
            password: 'password123',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
