// testing with context and a custom render method
// http://localhost:3000/easy-button

import {render, screen} from '../../../test/test-utils'
import {ThemeProvider} from '../../../components/theme'
import EasyButton from '../../../components/easy-button'

// This is actually not an optimal way of testing coz it has implementation details with the presence of `Provider`
test('renders with the light styles for the light theme', () => {
	function Wrapper({children}: {children: React.ReactNode}) {
		return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
	}
	render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
	const button = screen.getByRole('button', {name: /easy/i})
	expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

// Abstracting away the Provider into a custom render method, therefore, avoided implementation details
test('renders with the dark styles for the dark theme', () => {
	render(<EasyButton>Easy</EasyButton>, {
		theme: 'dark',
	})
	const button = screen.getByRole('button', {name: /easy/i})
	expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
