window.onload = function() {
	var obj = getByClass($('calendar'),'stage')[0];
	var calendar = new Calendar(obj);
}

function Calendar(obj) {
	var date = new Date();

	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;    // 0-11
	this.date = date.getDate();
	this.hour = date.getHours();
	this.minutes = date.getMinutes();
	this.seconds = date.getSeconds();

	this.oParent = obj;
	this.iNowM = this.month;
	this.iNowY = this.year;

	this.create();
}

Calendar.prototype = {
	constructor : Calendar.constructor,
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
			for (var j = 0; j < 7; j++) {
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
		oTfoot.appendChild(oTr);
		oTable.appendChild(oTfoot);

		// 创建结束，后续执行内容
		this.addCaption(this.month,this.year);
		this.addTfoot();
		this.addDate(this.month,this.year);
	},
	// 添加caption的内容
	addCaption : function(m,y) {
		var oCaption = this.oParent.getElementsByTagName('caption')[0];
		oCaption.innerHTML = '<span class="prev" title="上个月">&lt;&nbsp;' + (m == 1 ? 12 : m - 1) + '月</span><span class="ym">' + y + '年' + m + '月</span><span class="next" title="下个月">' + (m == 12 ? 1 : m + 1) + '月&nbsp;&gt;</span>'
	},
	// 添加tfoot的内容
	addTfoot : function() {
		var oTfoot = this.oParent.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0];
		var that = this;

		oTfoot.innerHTML = '<td colspan="7"><span class="today" title="返回当前日期">' + this.year + '年' + this.month + '月' + this.date + '日</span><span class="time">' + this.twoDigit(this.hour) + ':' + this.twoDigit(this.minutes) + ':' + this.twoDigit(this.seconds) + '</span></td>';

		setTimeout(function(){
			that.updateTime();
		},1000);
	},
	// 定时更新时间
	updateTime : function() {
		var oTime = getByClass(this.oParent,'time')[0];
		var that = this;

		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();

		oTime.innerHTML = this.twoDigit(h) + ':' + this.twoDigit(m) + ':' + this.twoDigit(s);

		setTimeout(function(){
			that.updateTime();
		},1000);
	},
	// 返回两位数
	twoDigit : function(num) {
		if (num.toString().length < 2) {
			return num = '0' + num.toString();
		} else {
			return num;
		}
	},
	// 添加日期
	addDate : function(m,y) {
		var end = start = 0;
		var oDay = new Date();
		var aTd = this.oParent.getElementsByTagName('tbody')[0].getElementsByTagName('td');
		aTd[35].parentNode.style.display = "table-row";

		// 判断当前月份天数
		if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
			end = 31;
		} else if (m == 4 || m == 6 || m == 9 || m == 11) {
			end = 30;
		} else if (m == 2) {
			if (this.isLeapYear(y)) {
				end = 29;
			} else {
				end = 28;
			}
		}

		oDay.setFullYear(y);
		oDay.setMonth(m - 1);
		oDay.setDate(1);

		// 判断该月1号是星期几
		if (oDay.getDay() == 0) {
			start = 6;
		} else {
			start = oDay.getDay() - 1;
		}

		// 每次加入日期前先清空
		for (var i = 0; i < aTd.length; i++) {
			aTd[i].innerHTML = "";
			aTd[i].className = "";
		};

		// 添加日期
		for (var i = 0; i < end; i++) {
			aTd[start].innerHTML = i+1;
			if (start == this.date - 1 && m == this.month && y == this.year) {
				aTd[start].className = "today";
			};
			start++;
		};

		// 删除空白行
		if (aTd[35].innerHTML == "") {
			aTd[35].parentNode.style.display = "none";
		};

		this.changeMonth();
		this.returnToday();
	},
	// 判断是否为闰年
	isLeapYear : function(year) {
		if ((year % 4 == 0) || ((year % 400 == 0) && (year % 100 == 0))) {
			return true;
		} else {
			return false;
		}
	},
	// 点击切换前后月份事件
	changeMonth : function() {
		var oPrev = getByClass(this.oParent,'prev')[0];
		var oNext = getByClass(this.oParent,'next')[0];
		var that = this;
		var year = month = 0;

		oPrev.onclick = function() {
			if (that.iNowM == 1) {
				month = 12;
				year = that.iNowY - 1;
			} else {
				month = that.iNowM - 1;
				year = that.iNowY;
			}

			that.iNowY = year;
			that.iNowM = month;
			that.addCaption(month,year);
			that.addDate(month,year);

			return false;
		}

		oNext.onclick = function() {
			if (that.iNowM == 12) {
				month = 1;
				year = that.iNowY + 1;
			} else {
				month = that.iNowM + 1;
				year = that.iNowY;
			}

			that.iNowY = year;
			that.iNowM = month;
			that.addCaption(month,year);
			that.addDate(month,year);

			return false;
		}
	},
	// 点击返回当前月份事件
	returnToday : function() {
		var that = this;
		var oToday = getByClass(this.oParent,'today')[0];

		oToday.onclick = function() {
			that.iNowM = that.month;
			that.iNowY = that.year;
			that.addCaption(that.month,that.year);
			that.addDate(that.month,that.year);

			return false;
		}
	}
}