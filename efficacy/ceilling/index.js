var Ceilling = function(obj, top) {
  this.top = top;
  this.ceillingObj = obj;
  this.addEvent();
}

Ceilling.prototype.addEvent = function() {
  var _top = this.top;
  var _ceillingObj = this.ceillingObj;

  window.addEventListener("scroll", function() {
    console.log(document.body.scrollTop);
    if (document.body.scrollTop >= _top) {
      _ceillingObj.style.display = "block";
    } else {
      _ceillingObj.style.display = "none";
    }
  });
}

window.onload = function() {
  var ceillingObj = document.querySelector(".ceilling-search");

  new Ceilling(ceillingObj, 100);
}
