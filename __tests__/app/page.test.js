// Import necessary modules
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from '../../app/components/Product';

test('renders Product component with given product', () => {
    // Mock product
    const product = {
        id: 1,
        title: 'Product 1',
        price: 10000,
        url: 'http://example.com/product1'
    };

    // Render Product component with mock product
    render(<Product product={product} />);

    // Check if product details are rendered
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`USD ${(product.price / 100).toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.url + '/190');
});

test('renders Product component without image if product.url is falsy', () => {
    // Mock product with falsy url
    const product = {
        id: 1,
        title: 'Product 1',
        price: 10000,
        url: ''
    };

    // Render Product component with mock product
    render(<Product product={product} />);

    // Check if product details are rendered
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`USD ${(product.price / 100).toFixed(2)}`)).toBeInTheDocument();

    // Check if image is not rendered
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
});