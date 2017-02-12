function DragValidator(oWrapper) {
  this.wrapper = oWrapper;
  this.dragText = oWrapper.getElementsByClassName("js_dragText")[0];
  this.dragBg = oWrapper.getElementsByClassName("js_dragBg")[0];
  this.dragHandler = oWrapper.getElementsByClassName("js_dragHandler")[0];

  this.drag();
}

DragValidator.prototype.drag = function() {
  var _this = this,

    oEvent = null,
    startX = 0,
    disX = 0,

    minWidth = 0,
    maxWidth = this.wrapper.offsetWidth - this.dragHandler.offsetWidth,

    // 按下鼠标执行
    startListener = function(ev) {
      oEvent = ev || event;
      startX = oEvent.clientX;

      document.addEventListener("mousemove",moveListener,false);
      document.addEventListener("mouseup",endListener,false);

      return false;
    },

    // 移动鼠标执行
    moveListener = function(ev) {
      oEvent = ev || event;
      disX = oEvent.clientX - startX;

      if (disX < minWidth) {
        disX = minWidth;
      }

      if (disX > maxWidth) {
        disX = maxWidth;
        success();
      }

      move();

      return false;
    },

    // 放开鼠标执行
    endListener = function() {
      removeListener();

      if (disX < maxWidth) {
        disX = minWidth;
        move();
      }
    },

    // 实现拖拽
    move = function() {
      _this.dragBg.style.width = disX + "px";
      _this.dragHandler.style.left = disX + "px";
    },

    // 验证成功执行
    success = function() {
      _this.wrapper.classList ? _this.wrapper.classList.add("success") : _this.wrapper.className += "success";
      _this.dragText.innerHTML = "验证成功";
      _this.dragHandler.removeEventListener("mousedown",startListener,false);

      removeListener();
    },

    // 解除事件绑定
    removeListener = function() {
      document.removeEventListener("mousemove",moveListener,false);
      document.removeEventListener("mouseup",endListener,false);
    };

  _this.dragHandler.addEventListener("mousedown",startListener,false);
};
