import { EnergyActive2Page } from './app.po';

describe('energy-active2 App', function() {
  let page: EnergyActive2Page;

  beforeEach(() => {
    page = new EnergyActive2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
