import { Locator } from '@playwright/test';

// I'm not using try/catch blocks for calls to this function as uncaught errors are fine. 99% of the time it will only error when
// developing tests, and the other 1% isn't worth cluttering up the tests with try/catches. 
export async function isElementValid(locator: Locator): Promise<boolean> {
  return locator.evaluate((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) {
      throw new Error(`Element must be an input, select, or textarea element ${el}`);
    }
    return el.validity.valid;
  });
};