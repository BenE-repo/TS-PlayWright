import { test, expect } from '@playwright/test';

// test('xxxx', async ({ page }) => {
// });

test.describe("Home Page", async () => {

  test.beforeEach(async ({ page }) => {

      await page.goto('https://ecommerce-playground.lambdatest.io/');
    });

  test('Title', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Your Store');
    
  });

  // Use a visual snapshot comparison to check the logo/search bar/menu at the top of the page are correct.
  // N.B. I'm assuming this part is relatively static, that the 'hot' and 'featured' labels aren't ever moved etc. 
  //      If they do then snapshot checking wouldn't be robust enough to use.
  test('Menu Bar Contents', async ({ page }) => {

    await expect(page).toHaveScreenshot("menu.png", {
      mask: [page.locator('#common-home'), page.locator('//footer')]

    })
  });

  // Use aria snapshot to check the contents of the 'Shop By Category' menu.
  // N.B. The snapshot has had '/children: equal' manually added for exact matching.
  test('Shop By Category List Contents', async ({ page }) => {

    await page.getByRole('button', { name: 'Shop by Category' }).click();
    await expect(page.locator('#mz-component-1626147655')).toMatchAriaSnapshot()
    
  });

  // Go to another page in the site and click 'Home' to check it takes us back
  test('Home Menu Navigation', async({ page }) => {
  
    await page.getByRole('link', { name: 'Special Hot', exact: true }).click();
    await page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/special');

    // There are two links back to 'Home' on the page we're on, so need to locate the menu button with .locator()
    // rather than just .getByRole()
    await page.locator('#widget-navbar-217834').getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

  });

  test('Special Menu Navigation', async({ page }) => {

    await page.getByRole('link', { name: 'Special Hot', exact: true }).click();
    await page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/special');

  });

  test('Blog Menu Navigation', async({ page }) => {

    await page.getByRole('link', { name: 'Blog', exact: true }).click();
    await page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home');
    
  });

  // The 'Mega Menu' menu is visible when moused over, so hover over it then use aria snapshot
  // to compare
  test('Mega Menu Content', async({ page }) => {

    await page.getByRole('button', { name: 'Mega Menu' }).hover();
    await expect(page.locator('#entry281_216475')).toMatchAriaSnapshot()
  
  });

  // The 'Mega Menu' is split into sections, 'Mobiles', 'Laptops' etc., so using XPath to get the 
  // links to every item in the 'Mobiles' section, loop through checking the correct page loads OK.
  test('Mega Menu Links - Mobile', async({ page }) => {

    const items = page.locator('//h3[text()[contains(.,"Mobiles")]]/../div/ul/li/a');
    const itemsCount = await items.count()

    // N.B. Only the first two pages are set up correctly on the test website, so this test will always
    // fail on the 3rd + loop through. Hence the hardcoded 2 loops.
    for (let i = 0; i < 2; i++) {
    // for (let i = 0; i < itemsCount; i++) {
      await page.getByRole('button', { name: 'Mega Menu' }).hover();
      await items.nth(i).click();
      let pageName = await items.nth(i).textContent();
      await expect(page.getByRole('heading', { name: pageName!, exact: true })).toBeVisible();
      await page.goto('https://ecommerce-playground.lambdatest.io/');

    }

    // -------------------------------------------------------
    // NOT DONE: Link tests for the other 'Mega Menu' sections
    // -------------------------------------------------------

    // -------------------------------------------------------
    // NOT DONE: Same tests as 'Mega Menu' for the 'AddOns' 
    // menu, as none of the links on the test site are hooked 
    // up correctly
    // -------------------------------------------------------

  });
  
});