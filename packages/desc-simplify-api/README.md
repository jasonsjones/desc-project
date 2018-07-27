[![Build Status][circleci-image]][circleci-url]

# DESC Simplify Project API

> RESTful json API to power the DESC Simplify project

---

## To run the server locally:

To get started running the server locally, first you need to clone the repo:

```bash
$ git clone https://github.com/jasonsjones/desc-simplify-api.git
$ cd desc-simplify-api
```

Once the project is cloned, you will then need to install the dependencies with `npm` or `yarn`:

```bash
$ npm install
```

or, alternatively

```bash
$ yarn install
```

With the dependencies installed, you will need to configure a `.env` file at the root of the project with the following environment variables defined:

-   `DB_URL_DEV`: the mongodb connection string for a dev database
-   `DB_URL_TEST`: the mongodb connection string for a test database

Your `<project-root>/.env` should look something like this:

```yaml
DB_URL_DEV=mongodb://localhost:27017/<name-of-dev-db>
DB_URL_TEST=mongodb://localhost:27017/<name-of-test-db>
```

_NOTE: If you do not have *mongodb* installed locally, check out [mLab](https://mlab.com) for a good database as a service solution. Their sandbox tier is free and should suffice for your local development needs._

Now with the environment set up, we can spin up the local server with:

```bash
$ npm run serve:dev
```

or

```bash
$ yarn serve:dev
```

By default the app server should be accessible at `http://localhost:3000`.

---

## To run the test suite(s) locally:

The npm scripts located in `package.json` provide a few targets to run different types of tests.

-   Execute unit tests only (all db calls/responses are mocked) by running:

```
$ yarn test:unit
```

-   Execute acceptance tests only by running:

```
$ yarn test:acceptance
```

-   Or run the full test suite locally, simply run:

```bash
$ yarn test
```

_WARNING_: Please double check that you have a _different_ test db set up in your `.env` since running the full suite of tests, mainly the acceptance tests, will actually make calls to the db, and the setup/teardown will be destructive to your data.

[circleci-image]: https://img.shields.io/circleci/project/github/jasonsjones/desc-simplify-api.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/jasonsjones/desc-simplify-api
