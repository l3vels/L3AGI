# L3 UI

## IDE

We encourage you to use [Visual Studio Code](https://code.visualstudio.com/)

Please install the following plugins:

- Code Spell Checker
- ESLint
- EditorConfig
- Prettier [See Installing for VSCode, WebStorm and others](https://prettier.io/docs/en/editors.html)

Optional plugins:

- GitLens
- TODO Highlight

## Node Version

We use `NVM` to manage the Node version. You can install it [NVM](https://github.com/nvm-sh/nvm)

Version is specified in `.nvmrc` file. Current version is `v18.10.0`

After installing NVM, run the following command to install the Node version used in this project:

```bash
nvm install
nvm use
```

## Install Dependencies

We use `yarn` to manage the dependencies. You can install it by running the following command and then install dependencies:

```bash
npm install -g yarn
yarn # or yarn install
```

## Committing

We use [Commitlint](https://commitlint.js.org/) to lint our commit messages. This ensures that we have consistent commit messages.

Example of a good commit message:

```bash
git commit -m "feat: add new button component"
```

Commit Types:

| Type     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| feat     | A new feature for user, not a new feature for build script                   |
| fix      | A bug fix for user, not a fix to a build script                              |
| chore    | Other changes that don't modify src or test files                            |
| style    | Changes that do not affect the meaning of the code (white-space, formatting) |
| docs     | Documentation only changes                                                   |
| refactor | A code change that neither fixes a bug nor adds a feature                    |
| perf     | A code change that improves performance                                      |
| test     | Adding missing tests or correcting existing tests                            |
| build    | Changes that affect the build system or external dependencies                |
| ci       | Changes to our CI configuration files and scripts                            |
| revert   | Reverts a previous commit                                                    |


## Available Scripts

In the game directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


