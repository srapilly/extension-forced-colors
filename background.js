async function setForcedColors(debugee, color, scheme) {
  return chrome.debugger.sendCommand(debugee, "Emulation.setEmulatedMedia", {
    features: [
      { name: "forced-colors", value: color },
      { name: "prefers-color-scheme", value: scheme },
    ],
  });
}

async function forcedColorEnabled(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => window.matchMedia("(forced-colors: active)").matches,
  });
  return result;
}

async function prefersDarkEnabled(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  });
  return result;
}

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const debugee = { tabId: tabId };

  try {
    await chrome.debugger.attach(debugee, "1.3");
  } catch {
    /* If it's already attached */
  }

  // Cycle between:
  //  - forced color with dark mode
  //  - forced color with light mode
  //  - nothing
  if ((await forcedColorEnabled(tabId)) && (await prefersDarkEnabled(tabId))) {
    await setForcedColors(debugee, "active", "light");
  } else if (await forcedColorEnabled(tabId)) {
    await setForcedColors(debugee, "none", "");
  } else {
    await setForcedColors(debugee, "active", "dark");
  }
});
