import { expect } from '@playwright/test';
import { test } from '@fixtures/base.fixture';
import { isElementValid } from '@helpers/html5Functions';

test.describe('Account Register and Login', async () => {

  test.beforeEach(async ({ page, registerAccount }) => {

    // TODO use config for url instead
    await page.goto(registerAccount.pageUrl);

  });

  test('Correct Field Values on Load', async({ registerAccount }) => {

    await expect(registerAccount.firstName).toHaveValue('');
    await expect(registerAccount.lastName).toHaveValue('');
    await expect(registerAccount.email).toHaveValue('');
    await expect(registerAccount.telephone).toHaveValue('');
    await expect(registerAccount.password).toHaveValue('');
    await expect(registerAccount.confirmPassword).toHaveValue('');
    await expect(registerAccount.newsletterSubscribe_no).toBeChecked();
    expect(await registerAccount.privacyPolicy.isChecked()).toEqual(false);

  });

  // N.B. Don't want to spam the test site with new accounts as I don't own it. In a real world situation
  // I would end this with logging into the new account and/or checking the DB itself for the new record
  // (then deleting the account from the DB)
  test('Register for Account: Fully Valid', async({ registerAccount }) => {

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

  test('Register for Account: Empty Form', async({ registerAccount }) => {

    await registerAccount.continue.click();
    await expect(registerAccount.firstNameError).toBeVisible();
    await expect(registerAccount.lastNameError).toBeVisible();
    await expect(registerAccount.emailError).toBeVisible();
    await expect(registerAccount.telephoneError).toBeVisible();
    await expect(registerAccount.passwordError).toBeVisible();

  });

  test('Register for Account: First Name Min/Max Lengths', async({ registerAccount }) => {

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

  test('Register for Account: Last Name Min/Max Lengths', async({ registerAccount }) => {

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

  // email uses the browser's built-in HTML5 validation, which could be argued doesn't need testing
  // as we have no control over it, but doesn't hurt to check...
  test('Register for Account: Email Validity - Basic String', async({ registerAccount }) => {

    await registerAccount.email.fill('BasicString');
    await registerAccount.continue.click();
    expect(await isElementValid(registerAccount.email)).toEqual(false);

  });

  test('Register for Account: Email Validity - No domain', async({ registerAccount }) => {

    await registerAccount.email.fill('NoDomain@');
    await registerAccount.continue.click();
    expect(await isElementValid(registerAccount.email)).toEqual(false);

  });

  // The built-in HTML5 validation for email doesn't seem to moan about the below on FF, Chrome or Safari
  // but the post-submit validation doesn't like it, so looking for a validation message to appear, like for the other fields
  test('Register for Account: Email Validity - No TLD', async({ registerAccount }) => {

    await registerAccount.email.fill('NoTLD@example');
    await registerAccount.continue.click();
    await expect(registerAccount.emailError).toBeVisible();

  });

  /*
    NOT DONE: etc. etc. for other things that can make an email address invalid.
  */

  /*
    NOT DONE: Telephone validation will be broadly the same as for email so will ignore for the purposes of this.
  */

  /*
    NOT DONE: Password tests for length as will be the same as done before
  */
  
  test('Password/Confirm Password equality - Basic', async({ registerAccount }) => {

    await registerAccount.password.fill('abcd');
    await registerAccount.confirmPassword.fill('aaaa');
    await registerAccount.continue.click();
    await expect(registerAccount.passwordConfirmError).toBeVisible();

  });

  test('Password/Confirm Password equality - Spaces Middle', async({ registerAccount }) => {

    await registerAccount.password.fill('abcd');
    await registerAccount.confirmPassword.fill('a bcd');
    await registerAccount.continue.click();
    await expect(registerAccount.passwordConfirmError).toBeVisible();

  });

  test('Password/Confirm Password equality - Spaces End', async({ registerAccount }) => {

    await registerAccount.password.fill('abcd');
    await registerAccount.confirmPassword.fill('abcd ');
    await registerAccount.continue.click();
    await expect(registerAccount.passwordConfirmError).toBeVisible();

  });

  test('Privacy Policy Accepted', async({ registerAccount }) => {

    await registerAccount.continue.click();
    await expect(registerAccount.privacyPolicyWarning).toBeVisible();

  });

});