import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";

export class BlogPage extends BasePom {

    public readonly pageUrl: string;

    constructor(page: Page) {
        
        super();
        this.pageUrl = this.baseURL + 'index.php?route=extension/maza/blog/home';
        
    }

}