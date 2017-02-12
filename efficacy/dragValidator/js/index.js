window.onload = function() {
  var dragList = document.getElementsByClassName("drag"),

    // 用于循环
    i,
    dragListLength = dragList.length;

  for (i = 0; i < dragListLength; i++) {
    (function(oWrapper) {
      new DragValidator(oWrapper);
    })(dragList[i]);
  }
}
