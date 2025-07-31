import { mergeExpects, mergeTests } from "@playwright/test";
import { test as pageTest } from '@fixtures/pageobjects.fixture';

export const test = mergeTests(pageTest);
export const expect = mergeExpects();