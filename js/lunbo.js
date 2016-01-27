window.onload = function() {
	//淡入淡出效果
	var oFade1_ImgList = getByClass($("fade1"),"imgList")[0].getElementsByTagName('li');
	var oFade1_Btn = getByClass($("fade1"),"btn")[0].getElementsByTagName('li');
	fade1.init(oFade1_ImgList,oFade1_Btn);

	// 无缝滚动效果1
	var oCarousel1_imgList = getByClass($("carousel1"),"imgList")[0].getElementsByTagName('li');
	var oCarousel1_Btn = getByClass($("carousel1"),"btn")[0].getElementsByTagName('li');
	carousel1.init(oCarousel1_imgList,oCarousel1_Btn);

	//无缝滚动效果2
	var oCarousel2_imgList = getByClass($("carousel2"),"imgList")[0].getElementsByTagName('li');
	var oCarousel2_BtnList = getByClass($("carousel2"),"btn")[0]
	var oCarousel2_Btn = oCarousel2_BtnList.getElementsByTagName('a');

	oCarousel2_BtnList.onmouseover = function() {
		for (var i = 0; i < oCarousel2_Btn.length; i++) {
			oCarousel2_Btn[i].style.display = "block";
		};
	}

	oCarousel2_BtnList.onmouseout = function() {
		for (var i = 0; i < oCarousel2_Btn.length; i++) {
			oCarousel2_Btn[i].style.display = "none";
		};
	}

	carousel2.init(oCarousel2_imgList,oCarousel2_Btn);

	// 无缝滚动效果3
	var oCarousel3_imgList = getByClass($("carousel3"),"imgList")[0].getElementsByTagName('li');
	var oCarousel3_BtnList = getByClass($("carousel3"),"btn")[0]
	var oCarousel3_Btn = oCarousel3_BtnList.getElementsByTagName('a');

	carousel3.init(oCarousel3_imgList,oCarousel3_Btn);
}

// 淡入淡出效果，用setInterval实现
/*var fade1 = {
	init : function(oImgList,oBtn) {	//初始化
		var This = this;

		this.oImgList = oImgList;
		this.oBtn = oBtn;
		this.iNow = 0;		//当前图片
		this.iNext = 1;		//下一张图片
		this.opacity1 = 1;		//当前图片的透明度
		this.opacity2 = 0;		//下一张图片的透明度
		this.stopTime = 2000;		//停顿2s

		this.timer = setInterval(function(){
			This.changeImg();
		},200);		//变换一张时间为2s（每0.2秒透明度变化0.1）;
		this.clickBtn();
	},
	changeImg : function() {		//淡出淡入，切换图片（改变图片透明度）
		var This = this;

		if (this.opacity1 == 0) {
			if (this.iNow == this.oImgList.length - 1) {
				this.iNow = 0;
				this.iNext = 1;
			} else {
				this.iNow++;
				if (this.iNext == this.oImgList.length - 1) {
					this.iNext = 0;
				} else {
					this.iNext++;
				}
			}

			this.opacity1 = 1;
			this.opacity2 = 0;
			this.stopChange();
		} else {
			this.opacity1 = (this.opacity1*10 - 1)/10;
			this.opacity2 = (this.opacity2*10 + 1)/10;
		};

		if (this.opacity2 == 0.5) {		//在下一张图片透明度一半时切换
			this.changeBtn();
		};

		this.oImgList[this.iNow].style.opacity = this.opacity1;
		this.oImgList[this.iNext].style.opacity = this.opacity2;
	},
	changeBtn : function() {	//切换按钮
		this.oBtn[this.iNow].className = "";
		this.oBtn[this.iNext].className = "active";
	},
	clickBtn : function() {		//点击切换图片
		var This = this;
		for (var i = 0; i < this.oBtn.length; i++) {
			this.oBtn[i].onclick = (function(index){
				return function(){
					clearInterval(This.timer);

					for (var i = 0; i < This.oBtn.length; i++) {
						This.oBtn[i].className = "";
						This.oImgList[i].style.opacity = 0;
					};

					This.opacity1 = 1;
					This.opacity2 = 0;
					This.iNow = index;

					if (index == This.oImgList.length - 1) {
						This.iNext = 0;
					} else {
						This.iNext = index + 1;
					}

					This.oImgList[This.iNow].style.opacity = This.opacity1;
					This.oBtn[This.iNow].className = "active";
					This.timer = setInterval(function(){
						This.changeImg();
					},200);
				}
			})(i);
		};
	},
	stopChange : function() {	//切换后停顿
		var This = this;
		clearInterval(this.timer);
		this.timer = setTimeout(function(){
			clearTimeout(This.timer);
			This.timer = setInterval(function(){
				This.changeImg();
			},200);
		},this.stopTime);
	}
}*/

// 淡入淡出效果，用setTimeout实现
var fade1 = {
	init : function(oImgList,oBtn) {	// 初始化
		this.oImgList = oImgList;
		this.oBtn = oBtn;
		this.iNow = 0;    // 当前的下标
		this.iNext = 1;    // 下一个的下标
		this.opacity1 = 1;    // 当前的透明度
		this.opacity2 = 0;    // 下一个的透明度

		this.changeImg();
		this.clickBtn();
	},
	changeImg : function() {    //切换图片
		var This = this;

		// 改变透明度
		this.opacity1 = (this.opacity1*10 - 1)/10;
		this.opacity2 = (this.opacity2*10 + 1)/10;
		this.oImgList[this.iNow].style.opacity = this.opacity1;
		this.oImgList[this.iNext].style.opacity = this.opacity2;

		//判断是否到切换零界点
		if (this.opacity1 == 0) {
			this.oBtn[this.iNow].className = "";

			this.opacity1 = 1;
			this.opacity2 = 0;

			this.iNow = this.iNext;
			this.iNext++;
			if (this.iNext == this.oImgList.length) {
				this.iNext = 0;
			};

			this.oBtn[this.iNow].className = "active";

			// 停顿5s后执行
			this.timer = setTimeout(function(){
				This.changeImg();
			},5000);
		} else {
			// 非切换零界点，则继续执行
			this.timer = setTimeout(function(){
				This.changeImg();
			},100);
		}
	},
	clickBtn : function() {    // 控制点的点击事件
		var oBtn = this.oBtn;
		var oImgList = this.oImgList;
		var This = this;

		for (var i = 0; i < oBtn.length; i++) {
			oBtn[i].onclick = (function(index){
				return function() {
					clearTimeout(This.timer);

					oBtn[This.iNow].className = "";
					oBtn[index].className = "active";
					oImgList[This.iNow].style.opacity = 0;
					oImgList[This.iNext].style.opacity = 0;

					This.opacity1 = 1;
					This.opacity2 = 0;

					This.iNow = index;
					This.iNext = index + 1;
					if (This.iNext == oBtn.length) {
						This.iNext = 0;
					};

					oImgList[This.iNow].style.opacity = This.opacity1;
					oImgList[This.iNext].style.opacity = This.opacity2;

					// 停顿2s后再继续切换图片
					This.timer = setTimeout(function(){
						This.changeImg();
					},2000);
				}
			})(i);
		};
	}
}

// 无缝滚动效果1
var carousel1 = {
	init : function(oImgList,oBtn) {	// 初始化
		this.oParent = oImgList[0].parentNode;
		this.oImgList = oImgList;
		this.oBtn = oBtn;
		this.oneWidth = oImgList[0].offsetWidth;	// 一张图片的宽度（450）
		this.maxLeft = this.oneWidth* oImgList.length;    // 滚动到最后一张时的left
		this.move = 10;    // 一次滚动的距离（0.9s滚过一张：450/10 * 20）
		this.iNow = 1;

		//将首张图片添加到最后，并设定总体的宽度
		this.oParent.appendChild(oImgList[0].cloneNode(true));
		this.oParent.style.width = oImgList.length * this.oneWidth + "px";

		this.changeImg();
		this.clickBtn();
	},
	changeImg : function() {    // 滚动图片
		var This = this;

		//检查是否到达最后一张，到达最后一张（即复制出来的第一张），则返回首张
		if (this.oParent.offsetLeft == -this.maxLeft) {
			this.oParent.style.left = "0";
			this.iNow = 1;
		} else {
			this.oParent.style.left = this.oParent.offsetLeft - this.move + "px";
		}

		this.timer = setTimeout(function(){
			This.changeImg();
		},20);
		this.stopChange();
	},
	stopChange : function() {    // 滚动过一张后停顿
		var This = this;

		// 判断是否滚过一张距离
		if (this.oParent.offsetLeft == - this.oneWidth*this.iNow) {
			// 切换控制点
			this.oBtn[this.iNow - 1].className = "";
			if (this.iNow == this.oImgList.length - 1) {
				this.iNow = 0;
				this.oBtn[this.iNow].className = "active";
			} else {
				this.iNow++;
				this.oBtn[this.iNow-1].className = "active";
			}

			clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				This.changeImg();
			},2000);
		};
	},
	clickBtn : function() {    // 控制点点击事件
		var This = this;
		for (var i = 0; i < this.oBtn.length; i++) {
			this.oBtn[i].onclick = (function(index){
				return function() {
					clearTimeout(This.timer);

					This.oBtn[This.iNow-1].className = "";
					This.oBtn[index].className = "active";
					This.iNow = index + 1;

					This.oParent.style.left = -index * This.oneWidth + "px";
					This.timer = setTimeout(function(){
						This.changeImg();
					},2000);
				}
			})(i);
		};
	}
}

// 无缝滚动效果2
var carousel2 = {
	init : function(oImgList,oBtn) {    // 初始化
		this.oImgList = oImgList;
		this.oBtn = oBtn;
		this.oParent = oImgList[0].parentNode;
		this.oneWidth = oImgList[0].offsetWidth;    // 一个图片的宽度
		this.iNow = 1;    // 当前图片下标
		this.bBtn = true;    //是否可以点击执行
		this.move = -10;    //初始时一次移动的距离

		this.oParent.innerHTML += this.oParent.innerHTML;    // 图片列表自我复制多一份
		this.oParent.style.width = this.oImgList.length * this.oneWidth + "px";    // 设置图片列表宽度

		this.changeImg();
		this.clickBtn();
	},
	changeImg : function() {    // 切换图片
		this.oParent.style.left = this.oParent.offsetLeft + this.move + "px";

		// 如果到达最后一张，则返回第一张，如果到达第一张，则返回最后一张
		if (this.oParent.offsetLeft < - this.oImgList.length/2 * this.oneWidth) {
			this.oParent.style.left = "0";
			this.iNow = 1;
		} else if (this.oParent.offsetLeft > 0) {
			this.oParent.style.left = - this.oImgList.length/2 * this.oneWidth + "px";
			this.iNow = this.oImgList.length/2;
		}

		//如果已经切换完一张，则停止切换，否则继续执行
		if (this.oParent.offsetLeft == - this.iNow * this.oneWidth) {
			this.stopChange();
			this.bBtn = true;
		} else {
			var This = this;
			this.bBtn = false;
			this.timer = setTimeout(function(){
				This.changeImg();
			},20);
		}
	},
	stopChange : function() {    //一张切换完后停顿（2s）
		this.iNow++;
		this.move = -10;    //改为默认移动距离

		var This = this;
		clearTimeout(this.timer);
		this.timer = setTimeout(function(){
			This.changeImg();
		},2000);
	},
	clickBtn : function() {    // 左右点击事件
		var This = this;
		for (var i = 0; i < this.oBtn.length; i++) {
			this.oBtn[i].onclick = function() {
				//只有在可以点击切换时才执行
				if (!This.bBtn) {
					return false;
				} else {
					This.bBtn = false;
				}

				clearTimeout(This.timer);
				This.iNow--;    // 改回stopChange之前的值

				//判断是下一张还是上一张
				if (this.className == "prev") {
					This.move = 10;
					if (This.iNow == 1) {
						This.iNow = This.oImgList.length/2;
					} else {
						This.iNow--;
					}
				} else if (this.className == "next") {
					This.move = -10;
					if (This.iNow == This.oImgList.length/2) {
						This.iNow = 1;
					} else {
						This.iNow++;
					}
				}

				This.changeImg();
				return false;
			}
		};
	}
}

// 无缝滚动效果3
var carousel3 = {
	init : function(oImgList,oBtn) {
		this.oImgList = oImgList;
		this.oBtn = oBtn;
		this.iMax = oImgList.length - 1;
		this.iPrev = this.iMax;
		this.iNow = 0;
		this.iNext = 1;
		this.iMove = -10;
		this.oneWidth = this.oImgList[0].offsetWidth;
		this.bBtn = true;

		this.changeImg();
		this.clickBtn();	
	},
	changeImg : function() {
		var This = this;
		var oNow = this.oImgList[this.iNow];
		var oNext = this.oImgList[this.iNext];

		oNow.style.left = oNow.offsetLeft + this.iMove + "px";
		oNext.style.left = oNext.offsetLeft + this.iMove + "px";

		if (oNext.offsetLeft == 0) {
			this.stopChange();
			this.bBtn = true;
		} else {
			this.timer = setTimeout(function(){
				This.changeImg();
			},20);
			this.bBtn = false;
		}
	},
	stopChange : function() {
		this.oImgList[this.iNow].style.left = this.oneWidth + "px";
		this.iMove = -10;

		if (this.iPrev == this.iNext) {
			if (this.iNext == 0) {
				this.iPrev = this.iMax;
			} else {
				this.iPrev = this.iNext - 1;
			}
		} else {
			this.iPrev = this.iNow;
		}
		this.iNow = this.iNext;
		if (this.iNext == this.iMax) {
			this.iNext = 0;
		} else {
			this.iNext++;
		}

		var This = this;
		this.timer = setTimeout(function(){
			This.changeImg();
		},2000);
	},
	clickBtn : function() {
		var This = this;

		for (var i = 0; i < this.oBtn.length; i++) {
			this.oBtn[i].onclick = function(){
				if (!This.bBtn) {
					return false;
				};

				clearTimeout(This.timer);
				
				if (this.className == "prev") {
					This.iNext = This.iPrev;
					This.iMove = 10;
					This.oImgList[This.iNext].style.left = - This.oneWidth + "px";
				}

				This.changeImg();
				return false;
			}
		};
	}
}