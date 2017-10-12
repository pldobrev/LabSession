# the Needy User

Develop a web application that delivers food, drinks and tv shows to a needy user.

## Getting started

- install
  - `git clone`
  - `npm install`

- run the tests:
  - `npm run test:server`
  - `npm run test:client`

- write code to make all the tests pass:
  - edit the `/client/api.js` file
  - edit the `/server/api.js` file

- run the app:
  - `npm run start`
  - open http://localhost:8053

## Front-end client: Fluid API

Edit the `/client/api.js` file.
Develop an API with the following interface:
- `api.get(something)`
- `api.get.me(something)`
- `api.get.me.a(something)`
- `api.go.get(something)`
- `api.go.get.me(something)`
- `api.go.get.me.a(something)`

All of these functions should use `global.fetch` to make a request to the backend

## Back-end service: Throttled API

Edit the `/server/api.js` file.
Develop an API with endpoints that return food/drink/tv-shows.
The API should only return 10 items before starting to return an error.

## Bonus

- Make the API restart the throttling after a timeout.
- Rewrite the `client/app.js` in React.
