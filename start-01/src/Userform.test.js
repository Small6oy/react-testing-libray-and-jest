import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
    //render component
    render(<UserForm />)

    //maninupalte tehe component or find an element in it
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    // Assertion - make sure the component is doing 
    // what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument()
})


test('it calls onUserAdd when the form is submitted', () => {
    const mock = jest.fn();
    //render component
    render(<UserForm onUserAdd={mock} />)

    //Find 2 Inputs
    const nameInput = screen.getByRole('textbox', { name: /name/i})
    const emailInput = screen.getByRole('textbox', { name: /email/i})

    //Simulate typing in a name
    user.click(nameInput)
    user.keyboard('jane')

    user.click(emailInput)
    user.keyboard('jane@jane.com')

    // Find the button
    const button = screen.getByRole('button')

    //Simulate clicking button
    user.click(button)

    // Assertion
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' })
})

test('empties inputs when the form is submitted', () => {
    const mock = jest.fn();
    //render component
    render(<UserForm onUserAdd={mock} />)

    //Find 2 Inputs
    const nameInput = screen.getByRole('textbox', { name: /name/i})
    const emailInput = screen.getByRole('textbox', { name: /email/i})
    const button = screen.getByRole('button')

    user.click(nameInput)
    user.keyboard('jane')

    user.click(emailInput)
    user.keyboard('jane@jane.com')

    user.click(button)


    // Assertion
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
})
