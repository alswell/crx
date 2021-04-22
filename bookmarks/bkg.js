// chrome.browserAction.setBadgeText({text: 'bkmk'})
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]})

let bookmarks = ""
chrome.runtime.onMessage.addListener(function (req, sender) {
    bookmarks = req
})
chrome.windows.onFocusChanged.addListener(function (win) {
    if (win === chrome.windows.WINDOW_ID_NONE)
        return
    chrome.tabs.query({active: true, windowId: win}, function (tabs) {
        tab = tabs[0]
        if (tab.url !== "" && bookmarks.indexOf(tab.url) !== -1)
            chrome.browserAction.setBadgeText({text: "***"})
        else
            chrome.browserAction.setBadgeText({})
    })
})
chrome.tabs.onActivated.addListener(function (info) {
    // console.log(info.tabId, info.windowId)
    chrome.tabs.get(info.tabId, function (tab) {
        if (tab.url !== "" && bookmarks.indexOf(tab.url) !== -1)
            chrome.browserAction.setBadgeText({text: "***"})
        else
            chrome.browserAction.setBadgeText({})
    })
})