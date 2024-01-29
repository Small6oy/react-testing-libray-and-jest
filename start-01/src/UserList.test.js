import { render, screen } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
    //render component
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'sam', email: 'sam@sam.com' },
    ]
    const { container } = render(<UserList users={users} />)

    return { container, users }
}

test('render one row per user', () => {
    //render component
    const { container } = renderComponent()

    //Find all the rows in the table
    // eslint-disable-next-line
    const rows = container.querySelectorAll('tbody tr')

    expect(rows).toHaveLength(2)
})

test('render the email and name of each user', () => {
    //render component
    const { users } = renderComponent()

    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name })
        const email = screen.getByRole('cell', { name: user.email })

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }

})