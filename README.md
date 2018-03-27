# Test Angular using CucumberJs

## Install
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
