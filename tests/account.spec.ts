import { test, expect } from '@playwright/test';
// import { PageHeader } from '../page_objects/pageHeader.pom';
import { RegisterAccount } from '../page_objects/registerAccount.pom';

test.describe('Account Register and Login', async () => {

  test.beforeEach(async ({ page }) => {
    const registerAccount = new RegisterAccount(page);
    // TODO use config for url instead
    await page.goto(registerAccount.pageUrl);

  });

  // N.B. Don't want to spam the test site with new accounts as I don't own it. In a real world situation
  // I would end this with logging into the new account and/or checking the DB itself for the new record
  // (then deleting the account from the DB)
  test('Register for Account: Fully Valid', async({ page }) => {

    const registerAccount = new RegisterAccount(page);
    await registerAccount.firstName.fill('Tom');
    await registerAccount.LastName.fill('Hunter');
    await registerAccount.email.fill('tomhunter@example.com');
    await registerAccount.telephone.fill('01603 123456');
    await registerAccount.password.fill('Aa123456');
    await registerAccount.confirmPassword.fill('Aa123456');
    // The clicks to the newsletter and privacy policy checkbox/radio buttons are getting intercepted
    // by another element. Need to bypass the element actionability checks with the 'force' option.
    // (in the real world I'd see if the page could be changed so it works better with Playwright)
    await registerAccount.newsletterSubscribe_yes.check({ force: true });
    // Commenting out this line so we can avoid registering a new user while still validaitng the page by
    // clicking 'continue'.
    // await registerAccount.privacyPolicy.check({ force: true});
    await registerAccount.continue.click();

  });
  
});