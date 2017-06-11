import { GreenpeaPage } from './app.po';

describe('Greenpea App', function() {
  let page: GreenpeaPage;

  beforeEach(() => {
    page = new GreenpeaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
