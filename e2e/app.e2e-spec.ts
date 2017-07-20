import { StudentPortalPage } from './app.po';

describe('student-portal App', () => {
  let page: StudentPortalPage;

  beforeEach(() => {
    page = new StudentPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
