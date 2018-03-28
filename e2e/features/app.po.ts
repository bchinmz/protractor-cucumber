import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('app-root h1'));
  }

  getParagraphText() {
    return this.getTitle().getText();
  }
}
