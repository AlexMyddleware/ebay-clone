// Import render and screen from @testing-library/react
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import * as rtl from '../../../node_modules/@testing-library/react';

// Import the TextInput component
import TextInput from '../../../app/components/TextInput';

test('renders TextInput component with given value', () => {
    // Render the TextInput component with a string prop
    render(<TextInput string="Hello World" onUpdate={() => {}} />);

    // Select the input field
    const input = screen.getByRole('textbox');

    // Check if input value is rendered correctly
    expect(input).toHaveValue('Hello World');
});

test('calls onUpdate function on input change', () => {
    const mockOnUpdate = jest.fn();
    rtl.render(<TextInput string="" onUpdate={mockOnUpdate} />);
    const input = rtl.screen.getByRole('textbox');
    rtl.fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnUpdate).toHaveBeenCalledWith('test');
});