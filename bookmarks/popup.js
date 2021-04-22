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

document.getElementById("cpSel").onclick=function() {
	chrome.windows.getCurrent({}, function (win) {
		chrome.tabs.query({highlighted: true}, function (tabs) {
			let tmp = ""
			for (let i = 0; i < tabs.length; ++i) {
				if (tabs[i].windowId === win.id) {
					let tab = tabs[i]
					tmp += `- [${tab.title}](${tab.url})\n`
				}
			}
			setClipBoardData(tmp)
		})
	})
}

document.getElementById("cpAll").onclick=function() {
	chrome.windows.getCurrent({populate: true}, function (win) {
		let tmp = ""
		for (let i = 0; i < win.tabs.length; ++i) {
			let tab = win.tabs[i]
			tmp += `- [${tab.title}](${tab.url})\n`
		}
		setClipBoardData(tmp)
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

