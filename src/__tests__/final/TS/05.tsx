// mocking HTTP requests
// 💯 reuse server request handlers
// http://localhost:3000/login-submission

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import {rest} from 'msw'
import Login from '../../../components/login-submission'
import {LoginFormValues} from '../../../components/login'

const buildLoginForm = build<LoginFormValues>({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	},
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
	render(<Login />)
	const {username, password} = buildLoginForm()

	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the username results in an error', async () => {
	render(<Login />)
	const {password} = buildLoginForm()

	userEvent.type(screen.getByLabelText(/password/i), password)
	// didn't type in the username and then submit
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	// error message is returned from the 'src\test\server-handlers.ts'
	expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
		`"username required"`,
	)
})

test('omitting the password results in an error', async () => {
	render(<Login />)
	const {username} = buildLoginForm()

	userEvent.type(screen.getByLabelText(/username/i), username)
	// didn't type in the password and then submit
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
		`"password required"`,
	)
})

test('unknown server error displays the error message', async () => {
	const testErrorMessage = "Shit's fucked"
	server.use(
		rest.post(
			'https://auth-provider.example.com/api/login',
			async (_req, res, ctx) => {
				return res(
					ctx.status(500),
					ctx.json({message: testErrorMessage}),
				)
			},
		),
	)
	render(<Login />)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

	expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
