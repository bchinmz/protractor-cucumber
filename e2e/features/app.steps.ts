import { Given } from 'cucumber';
import { browser, element, by } from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
const expect = chai.use(chaiAsPromised).expect;

Given('I open a page', function () {
  return browser.get('http://localhost:4200').then(() => {
    element(by.css('h1')).getText()
      .then(text => {
        expect(text).to.have.string("Welcome to app!")
      })
  });
});