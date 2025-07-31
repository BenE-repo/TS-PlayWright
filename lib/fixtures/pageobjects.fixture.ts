import { test as BaseTest } from '@playwright/test';
import { PageHeader } from '@pages/pageHeader.pom';
import { HomePage } from '@pages/homePage.pom';
import { SpecialPage } from '@pages/specialPage.pom';
import { BlogPage } from '@pages/blogPage.pom';
import { ComparePage } from '@pages/comparePage.pom';
import { LoginPage } from '@pages/loginPage.pom';
import { CartDrawer } from '@pages/cartDrawer.pom';
import { RegisterAccount } from '@pages/registerAccount.pom';

type PageObjects = {
    pageHeader: PageHeader;
    homePage: HomePage;
    specialPage: SpecialPage;
    blogPage: BlogPage;
    comparePage: ComparePage;
    loginPage: LoginPage;
    cartDrawer: CartDrawer;
    registerAccount: RegisterAccount;
};

export const test = BaseTest.extend<PageObjects>({
    pageHeader: async ({ page }, use) => {
        await use(new PageHeader(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    specialPage: async ({ page }, use) => {
        await use(new SpecialPage(page));
    },
    blogPage: async ({ page }, use) => {
        await use(new BlogPage(page));
    },
    comparePage: async ({ page }, use) => {
        await use(new ComparePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    cartDrawer: async ({ page }, use) => {
        await use(new CartDrawer(page));
    },
    registerAccount: async ({ page }, use) => {
        await use(new RegisterAccount(page));
    },
});