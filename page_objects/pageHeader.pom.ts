import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";
import { sprintf } from "sprintf-js";

export class PageHeader extends BasePom {

    public readonly pageUrl: string;
    public readonly shopByCategoryBtn: Locator;
    public readonly shopByCategoryMenu: Locator;
    public readonly home: Locator;
    public readonly special: Locator;
    public readonly blog: Locator;
    public readonly megaMenuBtn: Locator;
    public readonly megaMenuMenu: Locator;
    // Just have the 'mobile' catgegory here as the other ones aren't working on the test site
    public readonly mmCatMobile: Locator;
    public readonly compare: Locator;
    public readonly wishlist: Locator;
    public readonly shoppingCart: Locator;

    constructor(page: Page) {
        
        super();
        this.snapshotMask = [page.locator('#common-home'), page.locator('//footer')];
        this.shopByCategoryBtn = page.getByRole('button', { name: 'Shop by Category' });
        this.shopByCategoryMenu = page.locator('#mz-component-1626147655');
        this.pageUrl = this.baseURL + 'index.php?route=product/special';
        // The breadcrumb menu on some pages interferes means that there can be multiple links
        // with the same name, so have to locate by id first to make sure it's the link in 
        // the page header menu
        const _baseLocMenu = page.locator('#widget-navbar-217834');
        this.home = _baseLocMenu.getByRole('link', { name: 'Home' });
        this.special = _baseLocMenu.getByRole('link', { name: 'Special Hot'});
        this.blog = _baseLocMenu.getByRole('link', { name: 'Blog' });
        this.megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        this.megaMenuMenu = page.locator('#entry281_216475');
        // Trying to 'Show off' by doing some string formatting instead of concatting _strStart + "foobar + _strEnd"
        const _mmBase = `//h3[text()[contains(.,'%s')]]/../div/ul/li/a`;
        this.mmCatMobile = page.locator(sprintf(_mmBase, 'Mobiles'));
        // The icons at the top right also match multiple times on a simple selector, so need to locate by id first again
        const _baseLocIcons = page.locator('#entry_217820');
        this.compare = _baseLocIcons.getByRole('link', { name: 'Compare' });
        this.wishlist = _baseLocIcons.getByRole('link', { name: 'Wishlist' });
        // Theres no nice aria name for the shopping cart, so ugly XPath is needed instead.
        this.shoppingCart = page.locator(`//div[@id='entry_217825']/a[@href='#cart-total-drawer']`);

    }

}