// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../../components/use-counter'

function UseCounterHookSample() {
	const {count, increment, decrement} = useCounter()
	return (
		<div>
			<div>Current count: {count}</div>
			<button onClick={decrement}>Decrement</button>
			<button onClick={increment}>Increment</button>
		</div>
	)
}

test('exposes the count and increment/decrement functions', () => {
	render(<UseCounterHookSample />)
	const increment = screen.getByRole('button', {name: /increment/i})
	const decrement = screen.getByRole('button', {name: /decrement/i})
	const message = screen.getByText(/current count/i)

	expect(message).toHaveTextContent('Current count: 0')
	userEvent.click(increment)
	expect(message).toHaveTextContent('Current count: 1')
	userEvent.click(decrement)
	expect(message).toHaveTextContent('Current count: 0')
})

test("isolating the custom hook's functionality with a null component", () => {
	let result!: ReturnType<typeof useCounter>
	function TestComponent() {
		result = useCounter()
		return null
	}
	render(<TestComponent />)

	expect(result.count).toBe(0)
	act(() => result.increment())

	expect(result.count).toBe(1)
	act(() => result.decrement())

	expect(result.count).toBe(0)
})
