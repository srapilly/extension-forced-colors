# Forced Colors Chrome Extension

This chrome extension allows you to quickly enable and disable [forced colors emulation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/whats-new/2022/02/devtools#emulate-forced-colors-mode)

It can be enabled in the dev tools but I'm lazy :)

When clicking on the extension icon, it will cycle between 3 modes:

- Forced color with dark theme
- Forced color with light theme
- Nothing


https://user-images.githubusercontent.com/85184231/218323476-073186a4-4d00-451f-a300-074d4f66115e.mov


It's not in the chrome store for now, you can load it with the [developer mode](https://developer.chrome.com/docs/extensions/mv2/getstarted/#manifest)

## Testing

There is a playwright test with snapshots

```
npx playwright test
```

Snapshots are generated for darwin and linux, if you are on windows, you can use the following command to generate them:

```
npx playwright test --update-snapshots
```
