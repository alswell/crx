document.getElementById("f").onchange=function() {
	var reader = new FileReader();
	reader.readAsText(document.getElementById("f").files[0]);
	reader.onload=function() {
		console.log(this.result);
		document.getElementById("md").innerText = this.result
	}
};

document.getElementById("ck").onclick=function() {
	var root = new Object()
	root.a = "yes"
	console.log(root)
	document.getElementById("md").innerText = "root xxx".split(" ")
}

document.getElementById("do").onclick=function() {
	if (confirm("load bookmarks?")) {
		console.log("yes")
	} else {
		console.log("no")
	}
}
