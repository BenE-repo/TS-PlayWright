import { expect } from '@playwright/test';
import { test } from '@fixtures/pageobjects.fixture';

test.describe('Account Register and Login', async () => {

  test.beforeEach(async ({ page, registerAccount }) => {

    // TODO use config for url instead
    await page.goto(registerAccount.pageUrl);

  });

  // N.B. Don't want to spam the test site with new accounts as I don't own it. In a real world situation
  // I would end this with logging into the new account and/or checking the DB itself for the new record
  // (then deleting the account from the DB)
  test('Register for Account: Fully Valid', async({ page, registerAccount }) => {

    await registerAccount.firstName.fill('Tom');
    await registerAccount.lastName.fill('Hunter');
    await registerAccount.email.fill('tomhunter@example.com');
    await registerAccount.telephone.fill('01603 123456');
    await registerAccount.password.fill('Aa123456');
    await registerAccount.confirmPassword.fill('Aa123456');
    // The clicks to the newsletter and privacy policy checkbox/radio buttons are getting intercepted
    // by another element. Need to bypass the element actionability checks with the 'force' option.
    // (in the real world I'd see if the page could be changed so it works better with Playwright)
    await registerAccount.newsletterSubscribe_yes.check({ force: true });
    // Commenting out this line so we can avoid registering a new user while still validaitng the page on submit.
    // await registerAccount.privacyPolicy.check({ force: true});
    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeHidden();
    await expect(registerAccount.lastNameError).toBeHidden();
    await expect(registerAccount.emailError).toBeHidden();
    await expect(registerAccount.telephoneError).toBeHidden();
    await expect(registerAccount.passwordError).toBeHidden();
    await expect(registerAccount.passwordConfirmError).toBeHidden();

  });

  test('Register for Account: Empty Form', async({ page, registerAccount }) => {

    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeVisible();
    await expect(registerAccount.lastNameError).toBeVisible();
    await expect(registerAccount.emailError).toBeVisible();
    await expect(registerAccount.telephoneError).toBeVisible();
    await expect(registerAccount.passwordError).toBeVisible();

  });

  test('Register for Account: First Name Min/Max Lengths', async({ page, registerAccount }) => {

    // Empty
    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeVisible();
    // 1 Char
    await registerAccount.firstName.fill('A');
    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeHidden();
    // 32 Chars
    await registerAccount.firstName.fill('AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDD');
    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeHidden();
    // 33 Chars
    await registerAccount.firstName.fill('AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDDX');
    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeVisible();

  });

  test('Register for Account: Last Name Min/Max Lengths', async({ page, registerAccount }) => {

    // Empty
    await registerAccount.continue.click();
    await expect(registerAccount.lastNameError).toBeVisible();
    // 1 Char
    await registerAccount.lastName.fill('A');
    await registerAccount.continue.click();
    await expect(registerAccount.lastNameError).toBeHidden();
    // 32 Chars
    await registerAccount.lastName.fill('AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDD');
    await registerAccount.continue.click();
    await expect(registerAccount.lastNameError).toBeHidden();
    // 33 Chars
    await registerAccount.lastName.fill('AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDDX');
    await registerAccount.continue.click();
    await expect(registerAccount.lastNameError).toBeVisible();

  });

  test('Register for Account: Email Validity - Basic String', async({ page, registerAccount }) => {

    await registerAccount.email.fill('BasicString');
    await registerAccount.continue.click();
    // TODO: pop up error
    await expect(registerAccount.emailError).toBeVisible();

  });

  test('Register for Account: Email Validity - No domain', async({ page, registerAccount }) => {

    await registerAccount.email.fill('NoDomain@');
    await registerAccount.continue.click();
    // TODO: pop up error
    await expect(registerAccount.emailError).toBeVisible();

  });
});