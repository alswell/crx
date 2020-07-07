document.getElementById("dump").onclick=function() {
	chrome.tabs.create({url: "bookmarks.html"})
};

document.getElementById("load").onclick=function() {
	chrome.tabs.create({url: "load.html"})
};

document.getElementById("copy").onclick=function() {
	chrome.tabs.getSelected(null, function(tab) {
		setClipBoardData(`[${tab.title}](${tab.url})`)
	});
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

