import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";
import { sprintf } from "sprintf-js";

export class RegisterAccount extends BasePom {

    public readonly pageUrl: string;
    public readonly firstName: Locator;
    public readonly LastName: Locator;
    public readonly email: Locator;
    public readonly telephone: Locator;
    public readonly password: Locator;
    public readonly confirmPassword: Locator;
    public readonly newsletterSubscribe_yes: Locator;
    public readonly privacyPolicy: Locator;
    public readonly continue: Locator;

    constructor(page: Page) {
        
        super();
        this.pageUrl = this.baseURL + 'index.php?route=account/register';
        this.firstName = page.getByRole('textbox', { name: 'First Name*'});
        this.LastName = page.getByRole('textbox', { name: 'Last Name*'});
        this.email = page.getByRole('textbox', { name: 'E-Mail*'});
        this.telephone = page.getByRole('textbox', { name: 'Telephone*'});
        this.password = page.getByRole('textbox', { name: 'Password*'})
        this.confirmPassword = page.getByRole('textbox', { name: 'Password Confirm*'})
        this.newsletterSubscribe_yes = page.getByRole('group', { name: 'Newsletter' }).getByRole('radio', { name: 'Yes' });
        //this.newsletterSubscribe_yes = page.getByLabel('Yes');
        this.privacyPolicy = page.getByRole('checkbox', { name: 'I have read and agree to the Privacy Policy'});
        this.continue = page.getByRole('button', { name: 'Continue' });

        // this.snapshotMask = [page.locator('#common-home'), page.locator('//footer')];
        // this.shopByCategoryBtn = page.getByRole('button', { name: 'Shop by Category' });
        // this.shopByCategoryMenu = page.locator('#mz-component-1626147655');
        // this.pageUrl = this.baseURL + 'index.php?route=product/special';
        // // The breadcrumb menu on some pages interferes means that there can be multiple links
        // // with the same name, so have to locate by id first to make sure it's the link in 
        // // the page header menu
        // const _baseLocMenu = page.locator('#widget-navbar-217834');
        // this.home = _baseLocMenu.getByRole('link', { name: 'Home' });
        // this.special = _baseLocMenu.getByRole('link', { name: 'Special Hot'});
        // this.blog = _baseLocMenu.getByRole('link', { name: 'Blog' });
        // this.megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        // this.megaMenuMenu = page.locator('#entry281_216475');
        // // Trying to "Show off" by doing some string formatting instead of concatting _strStart + "foobar + _strEnd"
        // const _mmBase = `//h3[text()[contains(.,"%s")]]/../div/ul/li/a`;
        // this.mmCatMobile = page.locator(sprintf(_mmBase, 'Mobiles'));
        // // The icons at the top right also match multiple times on a simple selector, so need to locate by id first again
        // const _baseLocIcons = page.locator('#entry_217820');
        // this.compare = _baseLocIcons.getByRole('link', { name: 'Compare' });
        // this.wishlist = _baseLocIcons.getByRole('link', { name: 'Wishlist' });
        // // Theres no nice aria name for the shopping cart, so ugly XPath is needed instead.
        // this.shoppingCart = page.locator(`//div[@id='entry_217825']/a[@href='#cart-total-drawer']`);

    }

}