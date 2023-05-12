# [vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) Starter

This setup includes:
* [vite](https://vitejs.dev/)
* [eslint](https://eslint.org/), [typescript-eslint](https://typescript-eslint.io/), [eslint-airbnb-config](https://github.com/airbnb/javascript), [prettier](https://prettier.io/)
* [vitest](https://vitest.dev/), [jsdom](https://github.com/jsdom/jsdom), [@testing-library](https://testing-library.com/)
* [react-router v6](https://reactrouter.com/en/main)

# how to run?

npm install
npm run dev
npm run build
npm run test


# curiousity

## diff public/ src/assets

둘 다 static assets 넣는 장소인데,
minified 같은 pre-processing이 필요하면 assets/에 넣으면, build시 처리됨.
public/은 빌드 후, static assets들이 그대로 카피되어 사용됨 


## style guide - airbnb style

eslint-config-airbnb를 받으면, airbnb 회사가 선호하는 js, react, ts rule에 맞게 코드짜지 않으면 경고 뜸

VSC에 marketplace에서 ESLint 다운받고,
warning 뜨면, command + shift + p -> auto fix problem 하면, 포멧에 맞게 고쳐짐


.prettierrc.cjs에 룰 바꾸고, command + shift + p -> reload window 하면 prettier의 새로운 룰 적용됨.

## test

### vitest, and test libraries
vitest is test runners.
you need testing library like jest, react-test, jsdom to actually write test code


### where to locate test files
2 ways to locate your test files 

1. put all test files in test/
2. put test file right next to js file you want to test

in this example, 
took approach #2,
App.test.tsx is right next ao App.tsx


### BDD style test

take a look at App.test.tsx

testing format look like this.

1. ARRANGE
2. ACT
3. EXPECT


this looks awful like given/when/then from BDD




# References

* https://github.com/CodingGarden/react-ts-starter
* https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
* https://testing-library.com/docs/queries/about#priority
* https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
