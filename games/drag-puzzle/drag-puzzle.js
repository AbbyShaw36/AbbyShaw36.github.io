window.onload = function() {
  var oStage = document.querySelector(".stage");
  DragPuzzle.init(oStage);
}

var DragPuzzle = {
  // 游戏的图片
  url: "img/2.jpg",
  // 初始化
  init: function(oParent) {
    this.oBox = document.createElement('ul');
    oParent.appendChild(this.oBox);

    this.posArray = [];
    this.imgArray = [];

    this.create();
  },
  // 创建图片
  create: function() {
    var that = this;
    var oImg = new Image();
    oImg.src = this.url;
    // 图片加载完成
    oImg.onload = function() {
      var oBox = that.oBox;
      var oneWidth = this.width / 4;
      var oneHeight = this.height / 4;
      var oFragment = document.createDocumentFragment();

      oBox.style.width = this.width + "px";
      oBox.style.height = this.height + "px";

      // 创建小图
      for (var i = 0; i < 16; i++) {
        var oLi = document.createElement('li');
        var left = 0;
        var top = 0;

        if (i < 4) { // 第一行
          left = i * oneWidth;
        } else if (i >= 4 && i < 8) { // 第二行
          top = oneHeight;
          left = (i - 4) * oneWidth;
        } else if (i >= 8 && i < 12) { // 第三行
          top = 2 * oneHeight;
          left = (i - 8) * oneWidth;
        } else { // 第四行
          top = 3 * oneHeight;
          left = (i - 12) * oneWidth;
        }

        // 将初始的位置及元素保存
        that.posArray.push([i, top, left]);
        that.imgArray.push(oLi);

        oLi.id = i;
        oLi.style.width = oneWidth + "px";
        oLi.style.height = oneHeight + "px";
        oLi.style.backgroundImage = "url(" + that.url + ")";
        oLi.style.backgroundPosition = -left + "px " + -top + "px";
        oLi.isMove = false;

        oLi.onmousedown = function() {
          var oldLeft = this.style.left;
          var oldTop = this.style.top;

          for (var i = 0; i < that.imgArray.length; i++) {
            that.imgArray[i].style.zIndex = 0;
          };

          var This = this;
          document.onmousemove = function(ev) {
            var oEvent = window.event ? event : ev;
            var left = oEvent.clientX - that.oBox.offsetLeft - This
              .offsetWidth / 2 + document.body.scrollLeft;
            var top = oEvent.clientY - that.oBox.offsetTop - This.offsetHeight /
              2 + document.body.scrollTop;

            // 控制移动的小方块在区域内
            if (left < 0) {
              left = 0;
            } else if (left > that.oBox.offsetWidth - This.offsetWidth) {
              left = that.oBox.offsetWidth - This.offsetWidth;
            }

            if (top < 0) {
              top = 0;
            } else if (top > that.oBox.offsetHeight - This.offsetHeight) {
              top = that.oBox.offsetHeight - This.offsetHeight;
            }

            This.style.left = left + "px";
            This.style.top = top + "px";
            This.style.zIndex = 1;
            This.isMove = true;

            return false;
          }
          document.onmouseup = function(ev) {
            if (!This.isMove) {
              This.style.left = oldLeft;
              This.style.top = oldTop;

              document.onmousemove = null;
              document.onmouseup = null;

              return false;
            };

            var meetObj = that.meetObj(This);

            This.style.left = meetObj.style.left;
            This.style.top = meetObj.style.top;
            meetObj.style.left = oldLeft;
            meetObj.style.top = oldTop;

            // 判断是否过关
            if (that.isWin()) {
              alert("You win!");
              that.arrange();
            }

            document.onmousemove = null;
            document.onmouseup = null;
            This.isMove = false;
            return false;
          }
          return false;
        }
        oFragment.appendChild(oLi);
      };

      oBox.appendChild(oFragment);
      that.arrange();
    }
  },
  // 随机排列
  arrange: function() {
    var imgArray = this.imgArray.concat();
    var posArray = this.posArray.concat();

    while (imgArray.length) {
      var oImg = imgArray.splice(Math.floor(Math.random() * imgArray.length),
        1);
      var oPos = posArray.splice(Math.floor(Math.random() * posArray.length),
        1);
      oImg[0].style.top = oPos[0][1] + "px";
      oImg[0].style.left = oPos[0][2] + "px";
    }

    // 如果随机排列已经过关，则重新排列
    if (this.isWin()) {
      this.arrange();
    };
  },
  // 查找离移动对象最近的其他图片
  meetObj: function(obj) {
    var arr = [];
    for (var i = 0; i < this.imgArray.length; i++) {
      if (this.imgArray[i] != obj) {
        var distance = this.getDistance(this.imgArray[i], obj);
        if (arr.length < 1) {
          arr.push([this.imgArray[i], distance]);
        } else if (arr[0][1] > distance) {
          arr[0] = [this.imgArray[i], distance];
        }
      }
    };
    return arr[0][0];
  },
  // 利用勾股定理算出两个图片中心的距离
  getDistance: function(obj1, obj2) {
    var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft +
      obj2.offsetWidth / 2);
    var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop +
      obj2.offsetHeight / 2);
    return Math.ceil(Math.sqrt(a * a + b * b));
  },
  // 通过与初始位置对比，判断是否过关
  isWin: function() {
    for (var i = 0; i < this.imgArray.length; i++) {
      if (parseFloat(this.imgArray[i].style.left) !== this.posArray[i][2] ||
        parseFloat(this.imgArray[i].style.top) !== this.posArray[i][1]) {
        return false;
      }
    };
    return true;
  }
}
