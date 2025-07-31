import { expect } from '@playwright/test';
import { test } from '@fixtures/pageobjects.fixture';

test.describe('Page Header', async () => {

  test.beforeEach(async ({ page }) => {

    // TODO use config for url instead
    await page.goto('https://ecommerce-playground.lambdatest.io/');

  });
});