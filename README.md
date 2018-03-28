# Test Angular using CucumberJs
* Angular - the code to test
* Protractor - test executor
* Cucumber - to write test in plain language

## Setup
Assuming you already have an existing Angular app

`npm install --save-dev protractor-cucumber-framework`

`npm install --save-dev cucumber`

`npm install --save-dev chai`

`npm install --save-dev chai-as-promised`

`npm install --save-dev @types/cucumber`

`npm install --save-dev @types/chai`

`npm install --save-dev @types/chai-as-promised`


## Config
protractor.conf.js

```javascript
exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './e2e/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,

  framework: 'custom',  // set to "custom" instead of cucumber.

  frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file
  cucumberOpts: {
    require: ['./e2e/features/**/*.steps.ts'], // loads step definitions
    format: 'json: e2e-output.txt',               // enable console output
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json' //enable typescript
    });
  }
};
```

## Feature file
* based on _protractor.conf.js_ place to store the feature file will be in:
  * e2e\features\<filename>.features
  * e2e\features\<folder>\<filename>.features
* in the feature file, you may write your test in Gherkin

```gherkin
Feature: App page

    Scenario: First scenario
        Given I open app page
        When app page loads
        Then header "Welcome to app!" is displayed
```

## Steps definition
* based on _protractor.conf.js_ place to store the feature file will be in:
  * e2e\features\<filename>.steps.ts
  * e2e\features\<folder>\<filename>.steps.ts
* in the feature file, you may write your test in Gherkin

```javascript
import { Given, Before, When, Then } from 'cucumber';
import { browser, element, by, ExpectedConditions } from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { AppPage } from './app.po';
const expect = chai.use(chaiAsPromised).expect;

let appPage: AppPage = new AppPage();

Given('I open a page', function () {
  return browser.get('/').then(() => {
    element(by.css('h1')).getText()
      .then(text => {
        expect(text).to.have.string("Welcome to app!")
      })
  });
});

Before(() => {
  appPage = new AppPage();
});

Given('I open app page', () => {
  appPage.navigateTo();
});

When('app page loads', () => {
  return browser.wait(ExpectedConditions.visibilityOf(appPage.getTitle()), 5000);
});

Then('header {string} is displayed', (title) => {
  return appPage.getParagraphText()
    .then(text => {
      expect(text).to.have.string(title)
    })
});
```

## Timeout
* By default, asynchronous hooks and steps timeout after 5000 milliseconds.
* As the app grew larger and my laptop grew slower, is time to increase the timeout.
* Timeout can be globally modified. However, for some reason only specific hook or step's timeout work for me.

```javascript
Before({timeout: 60 * 1000}, function() {
  // Does some slow browser/filesystem/network actions
});

Given(/^a slow step$/, {timeout: 60 * 1000}, function() {
  // Does some slow browser/filesystem/network actions
});
```

See: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md


## Reference
* https://github.com/protractor-cucumber-framework/protractor-cucumber-framework
* https://github.com/cucumber/cucumber-js/tree/master/docs/support_files
* https://github.com/spektrakel-blog/angular-protractor-cucumber
