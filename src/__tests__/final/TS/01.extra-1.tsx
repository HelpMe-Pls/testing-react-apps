// simple test with ReactDOM
// 💯 use dispatchEvent
// http://localhost:3000/counter

import ReactDOM from 'react-dom'
import Counter from '../../../components/counter'

beforeEach(() => {
	document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
	const div = document.createElement('div')
	document.body.append(div)

	ReactDOM.render(<Counter />, div)
	const [decrement, increment] = Array.from(div.querySelectorAll('button'))
	if (!decrement || !increment) {
		throw new Error('decrement and increment not found')
	}
	if (!(div.firstChild instanceof HTMLElement)) {
		throw new Error('first child is not a div')
	}

	const message = div.firstChild.querySelector('div')
	if (!message) {
		throw new Error(`couldn't find message div`)
	}

	expect(message.textContent).toBe('Current count: 0')
	const clickEventDelegation = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		button: 0, // left mouse button
	})
	increment.dispatchEvent(clickEventDelegation)
	expect(message.textContent).toBe('Current count: 1')

	decrement.dispatchEvent(clickEventDelegation)
	expect(message.textContent).toBe('Current count: 0')
})
