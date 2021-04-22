document.getElementById("f").onchange = function () {
	const reader = new FileReader()
	reader.readAsText(document.getElementById("f").files[0])
	reader.onload = function () {
		console.log(this.result)
		document.getElementById("md").innerText = this.result
	}
}

const root = {name: "root", items: []}
document.getElementById("ck").onclick = function () {
	const seq = {node: root, next: null}
	let current = root
	const lines = document.getElementById("md").innerText.split("\n")
	for (const i in lines) {
		const line = lines[i]
		console.log(line)
		if (line.startsWith("#")) {
			let tmp = seq
			for (let j = 1; j < line.length; ++j) {
				if (line[j] === '#' && tmp.next != null) {
					tmp = tmp.next
				} else {
					current = {name: line.slice(j).trim(), items: []}
					tmp.node.items.push(current)
					tmp.next = {node: current, next: null}
					break
				}
			}
		} else {
			const kv = line.split("](")
			if (kv.length === 1) {
				current.items.push({name: null, url: kv[0].slice(3)})
			} else {
				current.items.push({name: kv[0].slice(3), url: kv[1].slice(0, -1)})
			}
		}
	}
	console.log(root)
}

document.getElementById("do").onclick = function () {
	if (confirm("load bookmarks?")) {
		console.log("yes")
		if (root.items.length === 0) {
			return
		}
		console.log("yes")
	} else {
		console.log("no")
	}
}
