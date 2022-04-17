// Avoid implementation details
// 💯 use userEvent
// http://localhost:3000/counter

import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
	render(<Counter />)

	// Use the `screen` object to avoid implementation details (notice that the order of the buttons is now isn't strict anymore compared to the previous version using array):
	const increment = screen.getByRole('button', {name: /increment/i})
	const decrement = screen.getByRole('button', {name: /decrement/i})
	const message = screen.getByText(/current count/i)
	// instead of this:
	// const {container} = render(<Counter />)
	// const [decrement, increment] = container.querySelectorAll('button')
	// const message = container.firstChild.querySelector('div')

	expect(message).toHaveTextContent('Current count: 0')
	fireEvent.click(increment)
	expect(message).toHaveTextContent('Current count: 1')

	/**
	 * When a user clicks a button, they first have to move their mouse
	 * over the button which will fire some mouse events.
	 * They'll also mouse down and mouse up on the input and focus it.
	 * To avoid implementation detail, we use `userEvent` to abstract away those
	 * implicit events from the test.
	 */
	userEvent.click(decrement)
	expect(message).toHaveTextContent('Current count: 0')
})
