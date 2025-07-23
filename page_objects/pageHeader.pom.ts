import { Locator, Page } from "@playwright/test";
import { BasePom } from "./basePom.pom";

export class PageHeader extends BasePom {

    public readonly pageUrl: string;
    public readonly special: Locator;

    constructor(page: Page) {
        
        super();
        this.snapshotMask = [page.locator('#common-home'), page.locator('//footer')];
        this.pageUrl = this.baseURL + 'index.php?route=product/special';
        this.special = page.getByRole('link', { name: 'Special Hot', exact: true });
    }

}