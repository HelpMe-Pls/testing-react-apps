// simple test with React Testing Library
// 💯 use @testing-library/jest-dom
// http://localhost:3000/counter

import {render, fireEvent} from '@testing-library/react'
import Counter from '../../../components/counter'

// remove this. React Testing Library does this automatically!
// beforeEach(() => {
//   document.body.innerHTML = ''
// })

test('counter increments and decrements when the buttons are clicked', () => {
	// swap ReactDOM.render with React Testing Library's render
	// Note that React Testing Library's render doesn't need you to pass a `div`
	// so you only need to pass one argument. render returns an object with a
	// bunch of utilities on it. For now, let's just grab `container` which is
	// the div that React Testing Library creates for us.
	// ReactDOM.render(<Counter />, div)
	const {container} = render(<Counter />)
	const [decrement, increment] = Array.from(
		container.querySelectorAll('button'),
	)
	if (!decrement || !increment) {
		throw new Error('decrement and increment not found')
	}

	if (!(container.firstChild instanceof HTMLElement)) {
		throw new Error('first child is not a div')
	}

	const message = container.firstChild.querySelector('div')
	if (!message) {
		throw new Error(`couldn't find message div`)
	}

	// switch from Jest's built-in assertions to more specific assertions
	// from the `@testing-library/jest-dom`
	// expect(message.textContent).toBe('Current count: 0')
	expect(message).toHaveTextContent('Current count: 0')

	fireEvent.click(increment)
	expect(message).toHaveTextContent('Current count: 1')

	fireEvent.click(decrement)
	expect(message).toHaveTextContent('Current count: 0')
})
