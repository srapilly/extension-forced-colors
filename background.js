const tabsEnabled = new Set();

async function setForcedColors(debugee, value) {
    await chrome.debugger.sendCommand(debugee, 'Emulation.setEmulatedMedia',
        {features: [{name: 'forced-colors', value: value}]})
}

chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id
    const debugee = {tabId: tabId}

    if (tabsEnabled.has(tabId)) {
        await setForcedColors(debugee, 'none')
        tabsEnabled.delete(tabId)
    } else {
        await chrome.debugger.attach(debugee, "1.3")
        await setForcedColors(debugee, 'active')
        tabsEnabled.add(tabId)
    }
});

chrome.debugger.onDetach.addListener(async (tab) => {
    tabsEnabled.clear()
})