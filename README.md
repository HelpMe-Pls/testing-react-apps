# What I've learnt
###### *For more details, see `src/exercise/*.md` files*
-------------
## Simple testing with ReactDOM
- Use VanillaJS to prepare the DOM for your test
- Assert the order of your elements by using Array destructuring
- [Remember](https://github.com/HelpMe-Pls/testing-react-apps/blob/master/src/__tests__/final/TS/01.tsx) to type check `HTMLElement` in your test
- Clean up after each test to ensure their isolation:
```ts
  beforeEach(() => {
	document.body.innerHTML = ''
})
``` 