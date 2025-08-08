import { Locator } from '@playwright/test';

// Determines if the passed in element of the page (Input/Select/TextArea) is valid as per the browser built-in HTML5 form validation
// (https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) and returns a boolean.
// Will throw an error if the passed in element isn't an Input, Select or TextArea.
export async function isElementValid(locator: Locator): Promise<boolean> {
  return locator.evaluate((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) {
      throw new Error(`Element must be an input, select, or textarea element ${el}`);
    }
    return el.validity.valid;
  });
};