import { test, expect } from '@playwright/test';
import { PageHeader } from '../page_objects/pageHeader.pom';
import { HomePage } from '../page_objects/homePage.pom';
import { SpecialPage } from '../page_objects/specialPage.pom';
import { BlogPage } from '../page_objects/blogPage.pom';
import { ComparePage } from '../page_objects/comparePage.pom';
import { LoginPage } from '../page_objects/loginPage.pom';
import { CartDrawer } from '../page_objects/cartDrawer.pom';

test.describe('Page Header', async () => {

  test.beforeEach(async ({ page }) => {

    // TODO use config for url instead
    await page.goto('https://ecommerce-playground.lambdatest.io/');

  });

  
});