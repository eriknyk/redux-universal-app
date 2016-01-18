
# Isomorphic App Demo

**Adapted from [universal example](https://github.com/rackt/redux/tree/master/examples/universal) from redux official examples**

### Demo app

- [redux] (https://github.com/rackt/redux) v3.0.0
- [react](https://github.com/facebook/react) v0.14.0
    - ECMA 6 Classes
- [react-router](https://github.com/rackt/react-router) v2.0.0-rc5
    - declarative route config
    - asynchronous routes
- [redux-simple-router](https://github.com/jlongster/redux-simple-router) v2.0.2
- [babel] (https://github.com/babel/babel) 5.8.x
- [webpack] (https://github.com/webpack/webpack)

This shows routing on the client and the server with [react-router](https://github.com/rackt/react-router). Navigation uses history pushes on the client but browser refresh will render the current page correctly on the server.

## Usage


First install dependencies

```bash
npm install
```

And run development env

```bash
$ npm run dev
```

Open http://localhost:3000
