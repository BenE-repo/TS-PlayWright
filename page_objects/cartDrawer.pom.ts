import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";

export class CartDrawer extends BasePom {

    //public readonly pageUrl: string;
    public readonly mainForm: Locator;

    constructor(page: Page) {
        
        super();
        // this.pageUrl = this.baseURL + 'index.php?route=account/login';
        this.mainForm = page.locator('#cart-total-drawer');
        
    }

}