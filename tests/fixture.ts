import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

export const test = base.extend<{
    context: BrowserContext;
    toggleExtension: any;
}>({
    context: async ({ }, use) => {
        const pathToExtension = path.join(__dirname, '../');
        const context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });
        await use(context);
        await context.close();
    },
    toggleExtension: async ({ context }, use) => {
        let [background] = context.serviceWorkers();
        if (!background)
            background = await context.waitForEvent('serviceworker');

        const toggle = async () => {
            background.evaluate(async () => {
                // @ts-ignore
                const [tab] = await chrome.tabs.query({ active: true })
                // @ts-ignore
                await chrome.action.onClicked.dispatch(tab)
            })
        }

        await use(toggle)
    },
});
export const expect = test.expect;