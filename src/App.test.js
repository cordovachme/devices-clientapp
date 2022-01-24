import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./pages/Dashboard", () => () => <>{"any content"}</>);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/any content/i);
  expect(linkElement).toBeInTheDocument();
});
