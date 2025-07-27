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
    public readonly mmCatMobile: Locator;

    constructor(page: Page) {
        
        super();
        this.snapshotMask = [page.locator('#common-home'), page.locator('//footer')];
        this.shopByCategoryBtn = page.getByRole('button', { name: 'Shop by Category' });
        this.shopByCategoryMenu = page.locator('#mz-component-1626147655');
        this.pageUrl = this.baseURL + 'index.php?route=product/special';
        // The breadcrumb menu on some pages interferes means that there can be multiple links
        // with the same name, so have to locate by id first to make sure it's the link in 
        // the page header menu
        const _baseLoc = page.locator('#widget-navbar-217834');
        this.home = _baseLoc.getByRole('link', { name: 'Home' });
        this.special = _baseLoc.getByRole('link', { name: 'Special Hot'});
        this.blog = _baseLoc.getByRole('link', { name: 'Blog' });
        this.megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        this.megaMenuMenu = page.locator('#entry281_216475');
        // Trying to "Show off" by doing some string formatting instead of concatting _strStart + "foobar + _strEnd"
        const _mmBase = `//h3[text()[contains(.,"%s")]]/../div/ul/li/a`;
        this.mmCatMobile = page.locator(sprintf(_mmBase, 'Mobiles'));

    }

}