document.getElementById("dump").onclick=function() {
	chrome.tabs.create({url: "bookmarks.html"})
};

document.getElementById("load").onclick=function() {
	chrome.tabs.create({url: "load.html"})
};

document.getElementById("copy").onclick=function() {
	chrome.tabs.getSelected(null, function(tab) {
		setClipBoardData(`[${tab.title}](${tab.url})`)
	})
};

document.getElementById("cpAll").onclick=function() {
	chrome.windows.getCurrent({populate: true}, function (win) {
		let tabs = ""
		for (let i in win.tabs) {
			let tab = win.tabs[i]
			tabs += `- [${tab.title}](${tab.url})\n`
		}
		setClipBoardData(tabs)
	})

};


function setClipBoardData(text) {
	const copy = function (e) {
		e.preventDefault();
		if (e.clipboardData) {
			e.clipboardData.setData('text/plain', text);
		} else if (window.clipboardData) {
			window.clipboardData.setData('Text', text);
		}
	};
	window.addEventListener('copy', copy);
    document.execCommand('copy');
    window.removeEventListener('copy', copy);
}

