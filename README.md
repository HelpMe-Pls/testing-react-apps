# What I've learnt
###### *For more details, see `src/__tests__/exercise/*.md` files*
-------------
## Intro to testing
- Use VanillaJS to prepare the DOM for your test
- Assert the order of your elements by using Array destructuring, from that, you can get the corresponding methods of that DOM object (thanks to [TypeScript](https://github.com/HelpMe-Pls/testing-react-apps/blob/master/src/__tests__/final/TS/01.extra-1.tsx), at line `42`) 
- Remember to type check `HTMLElement` in your test
- Use `dispatchEvent()` method to fire an event that doesn't have a dedicated method (like mouseover)
- Clean up after each test to ensure their isolation:
```ts
  beforeEach(() => {
	document.body.innerHTML = ''
})
``` 
- Use `@testing-library/react` [instead of](https://github.com/HelpMe-Pls/testing-react-apps/blob/master/src/__tests__/final/TS/02.tsx) `Jest` (for abstractions like auto cleanups, auto DOM preparation,...)
