# What I've learnt
###### *For more details, see `src/__tests__/exercise/*.md` files*
-------------
## Intro to testing
- Use VanillaJS to prepare the DOM for your test.
- Assert the order of your elements by using Array destructuring, from that, you can get the corresponding methods of that DOM object (thanks to [TypeScript](https://github.com/HelpMe-Pls/testing-react-apps/blob/master/src/__tests__/final/TS/01.extra-1.tsx), at line `42`).
- Remember to type check `HTMLElement` in your test.
- Use `dispatchEvent()` method to fire an event that doesn't have a dedicated method (like mouseover).
- Clean up after each test to ensure their isolation:
```ts
  beforeEach(() => {
	document.body.innerHTML = ''
})
``` 
- Use `@testing-library/react` [instead of](https://github.com/HelpMe-Pls/testing-react-apps/blob/master/src/__tests__/final/TS/02.tsx) `Jest` (for abstractions like auto cleanups, auto DOM preparation,...).

# Avoid implementation details
- You can tell whether tests rely on implementation details if they're written in a way that would fail if the implementation changes. For example, what if we wrapped our counter component in another `div` or swapped our `children` from a `div` to a `span` or `p`.  
- [Avoid](https://epicreact.dev/modules/testing-react-apps/avoid-implementation-details-solution) implementation details by querying for and interacting with the elements [in a way](https://testing-playground.com/) that is implementation detail free (i.e. presented in isolation) and refactor friendly.
- Abstract away the implementation details of an event (e.g. `click`) by using [`userEvent`](https://epicreact.dev/modules/testing-react-apps/avoid-implementation-details-extra-credit-solution-1) from the `@testing-library/user-event`.


## Form testing
- Use `screen.debug()` with the `testing-playground` Chrome extension [to build your test](https://epicreact.dev/modules/testing-react-apps/form-testing-solution-1).
- Use [`jest.fn()`](https://epicreact.dev/modules/testing-react-apps/form-testing-extra-credit-solution-1) as a mock function and assert it was called correctly rather than defining your own.
- [Generating](https://epicreact.dev/modules/testing-react-apps/form-testing-extra-credit-solution-4) test data by using [`@jackfranklin/test-data-bot`](https://www.npmjs.com/package/@jackfranklin/test-data-bot).

## Mocking HTTP requests
- 