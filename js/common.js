function $(id) {
	return document.getElementById(id);
}

function getByClass(oParent,className) {
	var arr = oParent.getElementsByTagName('*');
	var result = [];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].className == className) {
			result.push(arr[i]);
		};
	};

	return result;
}