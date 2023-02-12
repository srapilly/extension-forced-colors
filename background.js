
async function setForcedColors(debugee, value) {
    return await chrome.debugger.sendCommand(debugee, 'Emulation.setEmulatedMedia',
        {features: [{name: 'forced-colors', value: value}]})
}

async function forcedColorEnabled(tabId) {
    const [{ result }] = await chrome.scripting
        .executeScript({
            target : {tabId : tabId},
            func : () => window.matchMedia('(forced-colors: active)').matches,
        })

    return result
}

chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id
    const debugee = {tabId: tabId}

    try {
        await chrome.debugger.attach(debugee, "1.3")
    } catch { }

    if (await forcedColorEnabled(tabId)) {
        await setForcedColors(debugee, 'none')
    } else {
        await setForcedColors(debugee, 'active')
    }
});