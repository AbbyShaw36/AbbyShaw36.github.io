var Cart = function(cartWrapper) {
  this.cart = cartWrapper;
  this.init();
};

Cart.prototype = {
  constructor: Cart,
  init: function() {
    var dialogs = $.getAll(".js-dialog", this.cart);

    $.each(dialogs, function(dialog) {
      Dialog.init(dialog);
    });

    this.selectedOrders = [];
    this.addListener();
  },
  // 更新购物车选中商品数量、价格合计
  updateCartSum: function() {
    var selectedOrders = this.selectedOrders;
    var amountElem = $.get(".js-cart_amount", this.cart);
    var priceElem = $.get(".js-cart_price", this.cart);
    var amountSum = 0;
    var priceSum = 0;

    console.log(selectedOrders);
    $.each(selectedOrders, function(orderId) {
      var orderAmount = Number($.get("#" + orderId +
        " .js-order_amount").value);
      var orderSum = Number($.get("#" + orderId +
        " .js-order_sum").innerHTML.replace(/￥/g, ""));

      amountSum += orderAmount;
      priceSum += orderSum * 100;
    });

    priceSum = priceSum / 100;
    amountElem.innerHTML = amountSum;
    priceElem.innerHTML = "￥" + priceSum.toFixed(2);
  },
  // 更新订单总价
  updateOrderSum: function(order) {
    var price = Number($.get(".js-order_price", order).innerHTML.slice(1));
    var amount = Number($.get(".js-order_amount", order).value);
    var sumElem = $.get(".js-order_sum", order);

    sumElem.innerHTML = "￥" + (price * amount).toFixed(2);
  },
  // 选择订单（选中、去选）
  selectOrder: function(order, isChecked) {
    var orderCheckbox = $.get(".js-select_order", order);
    var orderId = order.id;
    var index = this.selectedOrders.indexOf(orderId);
    console.log(order);
    console.log(isChecked);

    if (index < 0 && isChecked) {
      this.selectedOrders.push(orderId);
      Checkbox.checked(orderCheckbox);
    } else if (!isChecked) {
      this.selectedOrders.splice(index, 1);
      Checkbox.unchecked(orderCheckbox);
    }
  },
  // 全选（选中、去选）
  selectCartAllOrder: function(isChecked) {
    var orders = $.getAll(".js-order", this.cart);
    var shopCheckboxs = $.getAll(".js-select_shop", this.cart);
    var selectAllCheckboxs = $.getAll(".js-select_all", this.cart);
    var _this = this;

    $.each(orders, function(order) {
      _this.selectOrder(order, isChecked);
    });

    $.each(shopCheckboxs, function(checkbox) {
      if (isChecked) {
        Checkbox.checked(checkbox);
      } else {
        Checkbox.unchecked(checkbox);
      }
    });

    $.each(selectAllCheckboxs, function(checkbox) {
      if (isChecked) {
        Checkbox.checked(checkbox);
      } else {
        Checkbox.unchecked(checkbox);
      }
    });
  },
  // 选择商家（选中、去选）
  selectShopOrder: function(shop, isChecked) {
    var orders = $.getAll(".js-order", shop);
    var _this = this;

    $.each(orders, function(order) {
      _this.selectOrder(order, isChecked);
    });
  },
  // 其下的订单是否全选中（购物车、商店）
  isAllSelected: function(parentNode) {
    var orderCheckboxs = $.getAll(".js-select_order", parentNode);
    var length = orderCheckboxs.length;
    var i = 0;

    for (; i < length; i++) {
      if (!$.hasClass(orderCheckboxs[i], "checked")) {
        return false;
      }
    }

    return true;
  },
  // 其下的订单是否为空
  isEmpty: function(parentNode) {
    var orders = $.getAll(".js-order", parentNode);

    if (orders.length > 0) {
      return false;
    } else {
      return true;
    }
  },
  emptyCart: function() {
    var cart = this.cart;

    if (this.isEmpty(cart)) {
      cart.parentNode.removeChild(cart);
    }
  },
  // 绑定事件
  addListener: function() {
    var selectAllCheckboxs = $.getAll(".js-select_all", this.cart);
    var shopCheckboxs = $.getAll(".js-select_shop", this.cart);
    var orderCheckboxs = $.getAll(".js-select_order", this.cart);
    var deleteOrderBtns = $.getAll(".js-order_delete", this.cart);
    var deleteOrderDialog = $.get(".js-order_delete_dialog", this.cart);
    var deleteOrderDialogConfirmBtn = $.get(".js-dialog_confirm",
      deleteOrderDialog);
    var deleteSelectedOrderBtn = $.get(".js-delete-selected", this.cart);
    var deleteSelectedOrderDialog = $.get(".js-orders_delete_dialog",
      this.cart);
    var deleteSelectedOrderDialogConfirmBtn = $.get(".js-dialog_confirm",
      deleteSelectedOrderDialog);
    var amountMinusBtns = $.getAll(".js-amount_minus", this.cart);
    var amountPlusBtns = $.getAll(".js-amount_plus", this.cart);
    var amountInputBoxs = $.getAll(".js-amount_input", this.cart);
    var shops = $.getAll(".js-shop", this.cart);
    var selectAllOrNot = function(isChecked) {
      if (!isChecked) {
        $.each(selectAllCheckboxs, function(checkbox) {
          Checkbox.unchecked(checkbox);
        });
      } else if (_this.isAllSelected(_this.cart)) {
        $.each(selectAllCheckboxs, function(checkbox) {
          Checkbox.checked(checkbox);
        });
      }
    };
    var _this = this;

    // 全选
    $.each(selectAllCheckboxs, function(checkbox) {
      $.on(checkbox, "click", function() {
        var isChecked = $.hasClass(this, "checked");

        _this.selectCartAllOrder(isChecked);
        _this.updateCartSum();
      });
    });

    // 选择商家
    $.each(shopCheckboxs, function(checkbox) {
      $.on(checkbox, "click", function() {
        var isChecked = $.hasClass(this, "checked");
        var shop = $.parents(this, "js-shop");

        _this.selectShopOrder(shop, isChecked);
        _this.updateCartSum();

        selectAllOrNot(isChecked);
      });
    });

    // 选择订单
    $.each(orderCheckboxs, function(checkbox) {
      $.on(checkbox, "click", function() {
        var order = $.parents(this, "js-order");
        var shop = $.parents(order, "js-shop");
        var shopCheckbox = $.get(".js-select_shop", shop);
        var isChecked = $.hasClass(this, "checked");

        _this.selectOrder(order, isChecked);
        _this.updateCartSum();

        if (!isChecked) {
          Checkbox.unchecked(shopCheckbox);

          $.each(selectAllCheckboxs, function(checkbox) {
            Checkbox.unchecked(checkbox);
          });
        } else if (_this.isAllSelected(shop)) {
          Checkbox.checked(shopCheckbox);
          selectAllOrNot(isChecked);
        }
      });
    });

    // 删除订单
    $.each(deleteOrderBtns, function(btn) {
      $.on(btn, "click", function() {
        var orderId = $.parents(this, "js-order").id;

        _this.deleteOrder = orderId;

        Dialog.show(deleteOrderDialog);
      });
    });

    $.on(deleteOrderDialogConfirmBtn, "click", function() {
      var orderId = _this.deleteOrder;
      var index = _this.selectedOrders.indexOf(orderId);
      var order = $.get("#" + orderId, _this.cart);
      var shop = $.parents(order, "js-shop");

      order.parentNode.removeChild(order);

      if (index >= 0) {
        _this.selectedOrders.splice(index, 1);
        _this.updateCartSum();
      }

      if (_this.isEmpty(shop)) {
        shop.parentNode.removeChild(shop);
      }

      _this.emptyCart();

      Dialog.hide(deleteOrderDialog);
    });

    // 删除订单列表
    $.on(deleteSelectedOrderBtn, "click", function() {
      Dialog.show(deleteSelectedOrderDialog);
    });

    $.on(deleteSelectedOrderDialogConfirmBtn, "click", function() {
      var selectedOrders = _this.selectedOrders;

      $.each(selectedOrders, function(orderId) {
        var order = $.get("#" + orderId, _this.cart);

        order.parentNode.removeChild(order);
      });

      _this.selectedOrders = [];

      $.each(shops, function(shop) {
        if (_this.isEmpty(shop)) {
          shop.parentNode.removeChild(shop);
        }
      });

      _this.emptyCart();
      _this.updateCartSum();

      Dialog.hide(deleteSelectedOrderDialog);
    });

    // 减少订单商品量
    $.each(amountMinusBtns, function(btn) {
      $.on(btn, "click", function() {
        var order = $.parents(this, "js-order");
        var index = _this.selectedOrders.indexOf(order.id);

        _this.updateOrderSum(order);

        if (index >= 0) {
          _this.updateCartSum();
        }
      });
    });

    // 增加订单商品量
    $.each(amountPlusBtns, function(btn) {
      $.on(btn, "click", function() {
        var order = $.parents(this, "js-order");
        var index = _this.selectedOrders.indexOf(order.id);

        _this.updateOrderSum(order);

        if (index >= 0) {
          _this.updateCartSum();
        }
      });
    });

    // 修改订单商品量
    $.each(amountInputBoxs, function(input) {
      $.on(input, "focus", function() {
        var order = $.parents(this, "js-order");
        var index = _this.selectedOrders.indexOf(order.id);

        $.on(this, "keyup", function() {
          _this.updateOrderSum(order);

          if (index >= 0) {
            _this.updateCartSum();
          }
        });
      });
    });
  }
};
