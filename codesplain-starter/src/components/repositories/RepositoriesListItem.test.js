import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RepositoriesListItem from './RepositoriesListItem'

function renderComponent() {
  const repository = {
    full_name: '',
    language: 'Javascript',
    description: 'Blah Blah Blah',
    owner: { login: 'facebook' },
    name: 'React',
    html_url: "https://github.com/facebook/react",
    stargazers_count: 1000,
    open_issues: 5,
    forks: 30
  }

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  )

  return { repository }
}

test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent()

  await screen.findByRole('img', { name: 'Javascript' })

  const link = screen.getByRole('link', { name: /github repository/i });
  expect(link).toHaveAttribute('href', repository.html_url)
})

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent()

  const icon = await screen.findByRole('img', { name: 'Javascript' })
  expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent()

  await screen.findByRole('img', { name: 'Javascript' })

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login)
  })

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})