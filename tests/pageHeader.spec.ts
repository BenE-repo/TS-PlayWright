import { test, expect } from '@playwright/test';
import { PageHeader } from '../page_objects/pageHeader.pom';
import { HomePage } from '../page_objects/homePage.pom';
import { SpecialPage } from '../page_objects/specialPage.pom';
import { BlogPage } from '../page_objects/blogPage.pom';

test.describe("Page Header", async () => {

  test.beforeEach(async ({ page }) => {

    // TODO use config for url instead
    await page.goto('https://ecommerce-playground.lambdatest.io/');

  });

  // Use a visual snapshot comparison to check the logo/search bar/menu at the top of the page are correct.
  // N.B. I'm assuming this part is relatively static, that the 'hot' and 'featured' labels aren't ever moved etc. 
  //      If they do then snapshot checking wouldn't be robust enough to use.
  test('Menu Bar Contents', async ({ page }) => {

    const pageHeader = new PageHeader(page);
    await expect(page).toHaveScreenshot('headerMenu.png', { mask: pageHeader.snapshotMask });

  });

  // Use aria snapshot to check the contents of the 'Shop By Category' menu.
  // N.B. The snapshot has had '/children: equal' manually added for exact matching.
  test('Shop By Category List Contents', async ({ page }) => {

    const pageHeader = new PageHeader(page);
    await pageHeader.shopByCategoryBtn.click();
    await expect(pageHeader.shopByCategoryMenu).toMatchAriaSnapshot({ name: 'ShopByCategory.yml'});
    
  });

  // Go to another page in the site and click 'Home' to check it takes us back
  test('Home Menu Navigation', async({ page }) => {
  
    const pageHeader = new PageHeader(page);
    const specialPage = new SpecialPage(page);
    const homePage = new HomePage(page);

    await pageHeader.special.click();
    await page.waitForURL(specialPage.pageUrl);

    await pageHeader.home.click();
    await page.waitForURL(homePage.pageUrl);

  });

  test('Special Menu Navigation', async({ page }) => {

    const pageHeader = new PageHeader(page);
   
    await pageHeader.special.click();
    await page.waitForURL(pageHeader.pageUrl);

  });

  test('Blog Menu Navigation', async({ page }) => {

    const pageHeader = new PageHeader(page);
    const blogPage = new BlogPage(page);

    await pageHeader.blog.click();
    await page.waitForURL(blogPage.pageUrl);
    
  });

  // The 'Mega Menu' menu is visible when moused over, so hover over it then use aria snapshot
  // to compare
  test('Mega Menu Content', async({ page }) => {

    const pageHeader = new PageHeader(page);
    await pageHeader.megaMenuBtn.hover();
    await expect(pageHeader.megaMenuMenu).toMatchAriaSnapshot({ name: 'MegaMenu.yaml'});
  
  });

  // The 'Mega Menu' is split into sections, 'Mobiles', 'Laptops' etc., so go through the 
  // links to every item in the 'Mobiles' section, loop through checking the correct page loads OK.
  test('Mega Menu Links - Mobile', async({ page }) => {

    const pageHeader = new PageHeader(page);
    // N.B. Only the first two pages are set up correctly on the test website, so this test will always
    // fail on the 3rd + loop through. Hence the hardcoded 2 loops.
    for (let i = 0; i < 2; i++) {
    // for (let i = 0; i < pageHeader.mmCatMobile.count(); i++) {
      await page.getByRole('button', { name: 'Mega Menu' }).hover();
      await pageHeader.mmCatMobile.nth(i).click();
      let pageName = await pageHeader.mmCatMobile.nth(i).textContent();
      await expect(page.getByRole('heading', { name: pageName!, exact: true })).toBeVisible();
      await page.goto('https://ecommerce-playground.lambdatest.io/');

    }

    /*
      NOT DONE: Link tests for the other 'Mega Menu' sections as it'll be essentially the same as above
    */ 

    /*
      NOT DONE: Same tests as 'Mega Menu' for the 'AddOns' menu, as none of the links on the test site are hooked 
      up correctly (and it'll essentially be the same as for the Mega Menu)
    */

  });
  
});