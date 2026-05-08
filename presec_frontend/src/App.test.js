import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './components/login';

test('renders login page', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Login to your account/i);
  expect(linkElement).toBeInTheDocument();
});
