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

test('renders TextInput component with an empty value when no string prop is passed', () => {
    rtl.render(<TextInput onUpdate={() => {}} />);
    const input = rtl.screen.getByRole('textbox');
    expect(input).toHaveValue('');
});

test('does not call onUpdate function when input does not change', () => {
    const mockOnUpdate = jest.fn();
    rtl.render(<TextInput string="test" onUpdate={mockOnUpdate} />);
    const input = rtl.screen.getByRole('textbox');
    rtl.fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnUpdate).not.toHaveBeenCalled();
});

test('calls onUpdate function with the correct value on multiple input changes', () => {
    const mockOnUpdate = jest.fn();
    rtl.render(<TextInput string="" onUpdate={mockOnUpdate} />);
    const input = rtl.screen.getByRole('textbox');
    rtl.fireEvent.change(input, { target: { value: 'test1' } });
    rtl.fireEvent.change(input, { target: { value: 'test2' } });
    expect(mockOnUpdate).toHaveBeenLastCalledWith('test2');
});

test('displays error message when error prop is passed', () => {
    rtl.render(<TextInput error="Error message" onUpdate={() => {}} />);
    const errorMessage = rtl.screen.getByText('Error message');
    expect(errorMessage).toBeInTheDocument();
});