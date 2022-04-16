// simple test with ReactDOM
// http://localhost:3000/counter

import ReactDOM from 'react-dom'
import Counter from '../../../components/counter'

// 🐨 cleanup by clearing out the DOM for the previous test
// 🦉 If you don't cleanup, then its result could impact other tests and/or cause a memory leak (i.e. the first failed test leads to the next test to fail, even if it's supposed to pass)
beforeEach(() => {
	document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
	const div = document.createElement('div')
	document.body.append(div)
	// console.log(document.body.innerHTML)

	ReactDOM.render(<Counter />, div)
	// console.log(document.body.innerHTML)

	// Use `Array` to make sure the order of the buttons is as expected (i.e. in the <Counter/>, the `decrement` button is mounted first)
	const [decrement, increment] = Array.from(div.querySelectorAll('button'))
	if (!decrement || !increment) {
		throw new Error('decrement and increment not found')
	}

	// TypeScript doesn't trust the DOM very much, so you'll need to verify
	// things are what they should be to make TypeScript happy here.
	if (!(div.firstChild instanceof HTMLElement)) {
		throw new Error('first child is not a div')
	}

	const message = div.firstChild.querySelector('div')
	if (!message) {
		throw new Error(`couldn't find the "message" div`)
	}

	expect(message.textContent).toBe('Current count: 0')
	increment.click()
	expect(message.textContent).toBe('Current count: 1')
	decrement.click()
	expect(message.textContent).toBe('Current count: 0')
})
