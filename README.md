# Test Angular using CucumberJs
* Angular - the code to test
* Protractor - test executor
* Cucumber - to write test in plain language

## Install
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

## Reference
* https://github.com/protractor-cucumber-framework/protractor-cucumber-framework
* https://github.com/cucumber/cucumber-js
* https://github.com/spektrakel-blog/angular-protractor-cucumber
