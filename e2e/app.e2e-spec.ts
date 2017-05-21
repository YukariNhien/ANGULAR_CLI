import { YukariAdminPage } from './app.po';

describe('yukari-admin App', () => {
  let page: YukariAdminPage;

  beforeEach(() => {
    page = new YukariAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
