import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCart } from '../../../app/context/cart';
import CartItem from '../../../app/components/CartItem';
import { ToastContainer } from 'react-toastify';


global.confirm = jest.fn(() => true);

jest.mock('../../../app/context/cart', () => ({
  useCart: jest.fn(),
}));

describe('CartItem component', () => {
  const mockProduct = {
    id: 1,
    title: 'Product 1',
    price: 10000,
    url: 'http://example.com/product1',
    description: 'Lorem ipsum dolor sit amet',
  };

  beforeEach(() => {
    useCart.mockReturnValue({
      removeFromCart: jest.fn(),
    });
  });

  test('renders CartItem component with given product', () => {
    render(<CartItem product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "USD" + (mockProduct.price / 100).toFixed(2);
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
    expect(screen.getByText('NEW')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description.substring(0, 150) + '...')).toBeInTheDocument();
  });
});

describe('CartItem component', () => {
  const mockProduct = {
    id: 1,
    title: 'Product 1',
    price: 10000,
    url: 'http://example.com/product1',
    description: 'Lorem ipsum dolor sit amet',
  };

  beforeEach(() => {
    useCart.mockReturnValue({
      removeFromCart: jest.fn(),
    });
  });

  test('renders CartItem component with given product', () => {
    render(<CartItem product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "USD" + (mockProduct.price / 100).toFixed(2);
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
    expect(screen.getByText('NEW')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description.substring(0, 150) + '...')).toBeInTheDocument();
  });
});