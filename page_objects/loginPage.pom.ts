import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";

export class LoginPage extends BasePom {

    public readonly pageUrl: string;

    constructor(page: Page) {
        
        super();
        this.pageUrl = this.baseURL + 'index.php?route=account/login';
        
    }

}