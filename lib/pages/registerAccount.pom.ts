import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";
import { sprintf } from "sprintf-js";

export class RegisterAccount extends BasePom {

    public readonly pageUrl: string;
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly email: Locator;
    public readonly telephone: Locator;
    public readonly password: Locator;
    public readonly confirmPassword: Locator;
    public readonly newsletterSubscribe_yes: Locator;
    public readonly newsletterSubscribe_no: Locator;
    public readonly privacyPolicy: Locator;
    public readonly continue: Locator;

    public readonly firstNameError: Locator;
    public readonly lastNameError: Locator;
    public readonly emailError: Locator;
    public readonly telephoneError: Locator;
    public readonly passwordError: Locator;
    public readonly passwordConfirmError: Locator;

    public readonly privacyPolicyWarning: Locator;

    constructor(page: Page) {
        
        super();
        this.pageUrl = this.baseURL + 'index.php?route=account/register';
        this.firstName = page.getByRole('textbox', { name: 'First Name*'});
        this.lastName = page.getByRole('textbox', { name: 'Last Name*'});
        this.email = page.getByRole('textbox', { name: 'E-Mail*'});
        this.telephone = page.getByRole('textbox', { name: 'Telephone*'});
        this.password = page.getByRole('textbox', { name: 'Password*'})
        this.confirmPassword = page.getByRole('textbox', { name: 'Password Confirm*'})
        this.newsletterSubscribe_yes = page.getByRole('group', { name: 'Newsletter' }).getByRole('radio', { name: 'Yes' });
        this.newsletterSubscribe_no = page.getByRole('group', { name: 'Newsletter' }).getByRole('radio', { name: 'No' });
        this.privacyPolicy = page.getByRole('checkbox', { name: 'I have read and agree to the Privacy Policy' });
        this.continue = page.getByRole('button', { name: 'Continue' });

        const _fieldErrorBase = `//label[text()='%s']/following-sibling::div/div[@class='text-danger']`
        this.firstNameError = page.locator(sprintf(_fieldErrorBase, 'First Name'));
        this.lastNameError = page.locator(sprintf(_fieldErrorBase, 'Last Name'));
        this.emailError = page.locator(sprintf(_fieldErrorBase, 'E-Mail'));
        this.telephoneError = page.locator(sprintf(_fieldErrorBase, 'Telephone'));
        this.passwordError = page.locator(sprintf(_fieldErrorBase, 'Password'));
        this.passwordConfirmError = page.locator(sprintf(_fieldErrorBase, 'Password Confirm'));

        // The privacy policy appears to be the only thing that uses the alert at the top of the page so locating like this.
        this.privacyPolicyWarning = page.locator('//div[@id="account-register"]/div[contains(@class,"alert")]');

    }

}