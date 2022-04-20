// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../../examples/location'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
const mockedGeolocation = {
	getCurrentPosition: jest.fn(),
}

beforeAll(() => {
	Object.defineProperty(window.navigator, 'geolocation', {
		value: mockedGeolocation,
	})
	// Similar to:
	// window.navigator.geolocation = {
	// 	getCurrentPosition: jest.fn(),
	// }
})

// Without the `!`, it's like:
// function scrap(a: number, b: string) {
// 		let c: boolean
// 		return c
// TS pops up with the error: "Variable 'c' is used before being assigned."
// }
// It's basically returning an `undefined` variable (which is like a no-op function, why would you want that, lol). By adding `!` right behind the variable, we tell TS compiler to ignore `undefined` or `null` types, therefore, suppressed the error.
function deferred() {
	let resolve!: (value?: unknown) => void
	let reject!: (reason?: unknown) => void
	const promise = new Promise((res, rej) => {
		resolve = res
		reject = rej
	})

	return {promise, resolve, reject}
}

test('displays the users current location', async () => {
	const fakePosition = {
		coords: {
			latitude: 35,
			longitude: 139,
		},
	}
	const {promise, resolve} = deferred()
	mockedGeolocation.getCurrentPosition.mockImplementation(successCallback => {
		promise.then(() => successCallback(fakePosition))
	})

	render(<Location />)

	expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

	resolve()

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	expect(screen.getByText(/latitude/i)).toHaveTextContent(
		`Latitude: ${fakePosition.coords.latitude}`,
	)
	expect(screen.getByText(/longitude/i)).toHaveTextContent(
		`Longitude: ${fakePosition.coords.longitude}`,
	)
})

test('displays error message when geolocation is not supported', async () => {
	const fakeError = new Error(
		'Geolocation is not supported or permission denied',
	)
	const {promise, reject} = deferred()

	mockedGeolocation.getCurrentPosition.mockImplementation(
		(_successCallback, errorCallback) => {
			promise.catch(() => errorCallback(fakeError))
		},
	)

	render(<Location />)

	expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

	reject()

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

	expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message)
})
