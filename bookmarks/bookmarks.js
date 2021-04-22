let md = ""

function printBookmarks(bookmarks, depth) {
	let groups = new Array()
	for (let i in bookmarks) {
		if (bookmarks[i].children === undefined) {
			if (bookmarks[i].title === "") {
				md += `- ${bookmarks[i].url}\n`
			} else {
				md += `- [${bookmarks[i].title}](${bookmarks[i].url})\n`
			}
		} else {
			groups.push(bookmarks[i])
		}
	}
	for (let i in groups) {
		for (let j = 0; j < depth; j++) {
			md += "#"
		}
		if (depth > 0) {
			md += ` ${groups[i].title}\n`
		}
		printBookmarks(groups[i].children, depth+1)
	}
}

function getBookmarks() {
	chrome.bookmarks.getTree(function (bookmarkArray) {
		// console.log(bookmarkArray)
		printBookmarks(bookmarkArray, 0)
		document.body.innerText = md
	})
}

getBookmarks()
