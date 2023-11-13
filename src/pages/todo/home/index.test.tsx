import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@/services/todoList/__tests__/testWrapper'

import TodoHome from '.'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    }),
  }
})

describe('TodoHome Component', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <TodoHome />
      </TestWrapper>
    )

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

    // Once loaded, check for main elements
  })
})
