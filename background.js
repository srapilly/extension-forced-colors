
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

async function notAttached(tabId) {
    return !(await chrome.debugger.getTargets())
        .some(object => object.tabId === tabId && object.attached)
}

chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id
    const debugee = {tabId: tabId}

    if (await notAttached(tabId)) {
        await chrome.debugger.attach(debugee, "1.3")
    }

    if (await forcedColorEnabled(tabId)) {
        await setForcedColors(debugee, 'none')
    } else {
        await setForcedColors(debugee, 'active')
    }
});