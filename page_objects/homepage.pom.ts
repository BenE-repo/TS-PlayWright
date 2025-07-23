import { Locator, Page } from "@playwright/test";

export class HomePage {
    public readonly xxx: Locator;

    constructor(page: Page) {
        this.xxx = page.getByRole('button')
    }

}