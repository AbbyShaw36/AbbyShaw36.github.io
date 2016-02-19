window.onload = function() {
	var oParent = $('magnify')
	var oHover = getByClass(oParent,'hover')[0];
	var oPiece = getByClass(oParent,'piece')[0];
	var oBigImg = getByClass(oParent,'bigImg')[0].getElementsByTagName('img')[0];

	var magnify = new Magnify(oParent,oHover,oPiece,oBigImg,2);
}

// 放大镜效果
function Magnify(oParent,oHover,oPiece,oBigImg,iMultiple) {
	this.oParent = oParent;
	this.oHover = oHover;
	this.oPiece = oPiece;
	this.oBigImg = oBigImg;
	this.iMultiple = iMultiple;    // 倍数（比例）

	this.over();
	this.out();
	this.move();
}

Magnify.prototype = {
	constructor : this.constructor,
	// mouseover事件，显示小方块和大图
	over : function() {
		var This = this;
		this.oHover.addEventListener("mouseover",function(){
			This.oPiece.style.display = "block";
			This.oBigImg.parentNode.style.display = "block";	
		});
	},
	// mouseout事件，隐藏小方块和大图
	out : function() {
		var This = this;
		this.oHover.addEventListener("mouseout",function(){
			This.oPiece.style.display = "none";
			This.oBigImg.parentNode.style.display = "none";	
		});
	},
	// mousemove事件，移动鼠标时移动小方块和大图
	move : function() {
		var This = this;
		this.oHover.addEventListener("mousemove",function(ev){
			This.oEvent = ev || event;
			This.pieceMove();
			This.imgMove();
		});
	},
	// 移动小方块
	pieceMove : function() {
		var l = this.oEvent.clientX - this.oParent.offsetLeft - this.oHover.offsetLeft - this.oPiece.offsetWidth/2;
		var t = this.oEvent.clientY - this.oParent.offsetTop - this.oHover.offsetTop - this.oPiece.offsetHeight/2;

		// 控制小方块在图片范围内
		if (l < 0) {
			l = 0;
		} else if (l > this.oParent.offsetWidth - this.oPiece.offsetWidth) {
			l = this.oParent.offsetWidth - this.oPiece.offsetWidth;
		}

		if (t < 0) {
			t = 0;
		} else if (t > this.oParent.offsetHeight - this.oPiece.offsetHeight) {
			t = this.oParent.offsetHeight - this.oPiece.offsetHeight;
		}

		this.oPiece.style.left = l + 'px';
		this.oPiece.style.top = t + 'px';

		this.l = l;
		this.t = t;
	},
	// 移动大图
	imgMove : function() {
		this.oBigImg.style.left = - this.l * this.iMultiple + "px";
		this.oBigImg.style.top = - this.t * this.iMultiple + "px";
	}
}