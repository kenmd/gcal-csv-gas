# Development Tools Setup


## Setup VSCode and Node.js

```bash
brew update && brew upgrade && brew cask upgrade

# install VSCode (auto complete & auto format out of the box)
brew cask install visual-studio-code

# check if you have ESLint Extension
code --list-extensions
# if not install Microsoft official ESLint extension
code --install-extension dbaeumer.vscode-eslint

# install Node.js
brew install nodenv
echo 'eval "$(nodenv init -)"' >> ~/.bashrc
echo 'export PATH=./node_modules/.bin:$PATH' >> ~/.bashrc
# restart bash

nodenv install --list | less  # find out the latest version
nodenv install 12.16.1
nodenv global 12.16.1
nodenv versions
node --version
> v12.16.1
```


## Setup TypeScript compiler, ESLint and Clasp

```bash
# install TypeScript compiler
npm install -g typescript
# restart bash

tsc --version
> Version 3.8.3
```

* create some project directory and install ESLint and Clasp

```bash
npm init -y
npm install --save-dev @google/clasp eslint
npm install --save @types/google-apps-script

npx clasp --version
> 2.3.2
npx eslint --version
v7.28.0

npx eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · node
✔ What format do you want your config file to be in? · JSON
# The config that you've selected requires the following dependencies:
# @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · Yes
# Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest

# run check
npx eslint ./dist
```


## GAS project setup

* create `tsconfig.json` as explained in the official document
  - https://github.com/google/clasp/blob/master/docs/typescript.md
* Turn on GAS API
  - https://script.google.com/home/usersettings
* Login
  - `clasp login`


## Update Node packages

```bash
# check outdated packages
npm outdated
npm outdated --save-dev

# this will update to the Wanted version
npm update
npm update --save-dev

# you can specify the Latest version
npm install --save @types/google-apps-script@0.0.56
```
