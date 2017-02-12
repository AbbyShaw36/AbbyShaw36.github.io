var Checkbox = {
  init: function() {
    var boxs = $.getAll(".js-checkbox");
    var _this = this;

    $.each(boxs, function(item) {
      $.on(item, "click", function() {
        if ($.hasClass(this, "checked")) {
          _this.unchecked(this);
        } else {
          _this.checked(this);
        }
      });
    });
  },
  checked: function(box) {
    var inputBox = $.get("input[type='checkbox']", box);

    $.addClass(box, "checked");
    inputBox.checked = true;
  },
  unchecked: function(box) {
    var inputBox = $.get("input[type='checkbox']", box);

    $.removeClass(box, "checked");
    inputBox.checked = false;
  }
};

var Dialog = {
  init: function(elem) {
    var closeBtns = $.getAll(".js-dialog_close", elem);
    var _this = this;

    $.each(closeBtns, function(item) {
      $.on(item, "click", function() {
        _this.hide(elem);
      });
    });
  },
  hide: function(elem) {
    var shadow = $.get(".js-dialog_shadow", elem);
    var dialog = $.get(".js-dialog_content", elem);

    shadow.style.display = "none";
    dialog.style.display = "none";
  },
  show: function(elem) {
    var shadow = $.get(".js-dialog_shadow", elem);
    var dialog = $.get(".js-dialog_content", elem);

    shadow.style.display = "block";
    dialog.style.display = "block";
  }
};

var Amount = function(elem) {
  this.wrapper = elem;
  this.minusBtn = $.get(".js-amount_minus", elem);
  this.plusBtn = $.get(".js-amount_plus", elem);
  this.inputBox = $.get(".js-amount_input", elem);
  this.currentValue = Number(this.inputBox.value);
  this.maxValue = Number(this.inputBox.getAttribute("data-max"));
  this.init();
};

Amount.prototype = {
  constructor: Amount,
  init: function() {
    this.addListener();
  },
  addListener: function() {
    var minusBtn = this.minusBtn;
    var plusBtn = this.plusBtn;
    var inputBox = this.inputBox;
    var _this = this;

    $.on(minusBtn, "click", function() {
      if ($.hasClass(this, "disabled")) {
        return;
      }

      _this.minus();
    });

    $.on(plusBtn, "click", function() {
      if ($.hasClass(this, "disabled")) {
        return;
      }

      _this.plus();
    });

    $.on(inputBox, "focus", function() {
      $.on(this, "keyup", function() {
        _this.input();
      });
    });

    $.on(inputBox, "blur", function() {
      this.onkeyup = null;
    });
  },
  minus: function() {
    var value = this.currentValue - 1;

    if (value <= 1) {
      $.addClass(this.minusBtn, "disabled");

      if (value < 1) {
        value = 1;
      }
    }

    this.inputBox.value = value;
    this.currentValue = value;

    if ($.hasClass(this.plusBtn, "disabled")) {
      $.removeClass(this.plusBtn, "disabled");
    }
  },
  plus: function() {
    var value = this.currentValue + 1;
    var maxValue = this.maxValue;

    if (value >= maxValue) {
      $.addClass(this.minusBtn, "disabled");

      if (value > maxValue) {
        value = maxValue;
      }
    }

    this.inputBox.value = value;
    this.currentValue = value;

    if ($.hasClass(this.minusBtn, "disabled")) {
      $.removeClass(this.minusBtn, "disabled");
    }
  },
  input: function() {
    var value = Number(this.inputBox.value.replace(/[^0-9]+/g, ""));
    var maxValue = this.maxValue;

    if (value <= 0) {
      value = 1;
    }

    if (value > maxValue) {
      value = maxValue;
    }

    this.inputBox.value = value;
    this.currentValue = value;
  }
};

window.onload = function() {
  Checkbox.init();

  var cart = $.get(".js-cart");
  var amounts = $.getAll(".js-amount");


  $.each(amounts, function(amount) {
    new Amount(amount);
  });

  new Cart(cart);
};
