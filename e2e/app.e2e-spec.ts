import { LuckyclubPage } from './app.po';

describe('luckyclub App', () => {
  let page: LuckyclubPage;

  beforeEach(() => {
    page = new LuckyclubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
