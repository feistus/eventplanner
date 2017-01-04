import { EventplannerPage } from './app.po';

describe('eventplanner App', function() {
  let page: EventplannerPage;

  beforeEach(() => {
    page = new EventplannerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
