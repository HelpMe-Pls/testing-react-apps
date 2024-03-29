// form testing
// 💯 allow for overrides
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../../components/login'
import type {LoginFormValues} from '../../../components/login'

// The Partial<Type> type is a built-in TypeScript utility type that takes a Type and creates a new type with all Type's properties set to optional.
// Read more: https://timmousk.com/blog/typescript-partial/
function buildLoginForm(overrides?: Partial<LoginFormValues>) {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password(),
		...overrides,
	}
}
test('submitting the form calls onSubmit with username and password', () => {
	const handleSubmit = jest.fn()
	render(<Login onSubmit={handleSubmit} />)
	const {username, password} = buildLoginForm()

	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	expect(handleSubmit).toHaveBeenCalledWith({
		username,
		password,
	})
	expect(handleSubmit).toHaveBeenCalledTimes(1)
})
