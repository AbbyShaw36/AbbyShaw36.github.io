window.onload = function() {
	var obj = getByClass($('calendar'),'stage')[0];
	var calendar = new Calendar(obj);
}

function Calendar(obj) {
	this.oParent = obj;
	this.create();
}

Calendar.prototype = {
	constructor : this.constructor,
	create : function() {
		// 创建table
		var oTable = document.createElement('table');
		this.oParent.appendChild(oTable);

		// 创建caption
		var oCaption = document.createElement('caption');
		oTable.appendChild(oCaption);

		// 创建thead部分
		var oThead = document.createElement('thead');
		var oTr = document.createElement('tr');
		var oFrag = document.createDocumentFragment();
		var week = ['一','二','三','四','五','六','日'];

		for (var i = 0; i < 7; i++) {
			var oTh = document.createElement('th');
			oTh.innerHTML = week[i];
			if (i == 5 || i == 6) {
				oTh.className = 'red';
			};
			oFrag.appendChild(oTh);
		};

		oTr.appendChild(oFrag);
		oThead.appendChild(oTr);
		oTable.appendChild(oThead);

		// 创建tbody部分
		var oTbody = document.createElement('tbody');

		for (var i = 0; i < 6; i++) {
			var oTr = document.createElement('tr');
			for (var i = 0; i < 7; i++) {
				var oTd = document.createElement('td');
				oTr.appendChild(oTd);
			};
			oFrag.appendChild(oTr);
		};
		
		oTbody.appendChild(oFrag);
		oTable.appendChild(oTbody);

		// 创建tfoot部分
		var oTfoot = document.createElement('tfoot');
		var oTr = document.createElement('tr');
		var oTd = document.createElement('td');
		oTd.colspan = "7";
		oTr.appendChild(oTd);
		oTfoot.appendChild(oTr);
		oTable.appendChild(oTfoot);
	}
}