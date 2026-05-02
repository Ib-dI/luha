import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

test('renders children', () => {
  const { getByText } = render(<div>Hello Luha</div>)
  expect(getByText('Hello Luha')).toBeInTheDocument()
})
