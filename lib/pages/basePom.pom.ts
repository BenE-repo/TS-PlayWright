import { Locator } from "@playwright/test";

export class BasePom {

    protected baseURL: string;
    public snapshotMask: Locator[];

    constructor() {
        // TODO convert to getting this from a config
        this.baseURL = 'https://ecommerce-playground.lambdatest.io/';
    }
}