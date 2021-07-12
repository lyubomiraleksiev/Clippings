# Protractor - Cucumber - Typescript Framework

## Prerequisites
* [Git](https://git-scm.com/downloads) (Latest)
* [NodeJS](https://nodejs.org/en/download/) (Latest)
* [Chrome](https://www.google.com/chrome/) (Latest)
* [Java](https://www.java.com/en/download/) (Latest)

## Initial setup
* npm install
* npm run webdriver-update

## How to start a test?
* npm run start:dev
    * To execute a specific suite
        * Open the config.ts where you will be able to view a list of all suites
        * Select a suite you want to execute by placing it in the package.json start:dev command
            * npm run build && protractor bin/config/config.js --suite={{suiteName}}