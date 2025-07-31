import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";

export class HomePage extends BasePom {

    public readonly pageUrl: string;
    // public readonly home: Locator;
    // public readonly special: Locator;

    constructor(page: Page) {
        
        super();
        // this.snapshotMask = [page.locator('#common-home'), page.locator('//footer')];
        this.pageUrl = this.baseURL + 'index.php?route=common/home';
        // The breadcrumb menu on some page interferes means that there can be multiple links
        // with the same name, so have to locate by class first to make sure it's the link in 
        // the page header menu
        // const _baseLoc = page.locator('#widget-navbar-217834');
        // this.home = _baseLoc.getByRole('link', { name: 'Home' });
        // this.special = _baseLoc.getByRole('link', { name: 'Special Hot'});
        
    }

}