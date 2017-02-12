/**
 * 视图层
 */
;
(function(doc) {
  "use strict";

  var _eachRowNum = 4; // 每行卡片个数

  // 所有点击事件
  var clickEvent = {

    // 点击卡片时执行
    ".card,.card *": function() {
      var card = this;

      if (!card.classList.contains(".card")) {
        card = card.parentNode;
      }

      // 广播事件，将点击的卡片的下标传递给控制层
      view.action.fire("card:flip", [view.getIndexOfCards(card)]);
    },

    // 点击开始按钮时执行
    ".btn": function() {
      view.action.fire("game:strat");
    }

  };

  var view = {

    // 初始化，清空所有卡片
    init: function() {
      this.cardsElem = doc.querySelector(".cards");
      this.cardsElem.innerHTML = "";
      this._cards = null;
    },

    // 创建卡片
    createCard: function(card) {
      var index = card.index;
      var cardElem =
        '<div class="card" style="top:' + Math.floor(index / 4) * 110 +
        'px; left: ' + (index % 4) * 80 +
        'px;"><div class="face front"></div><div class="face back ' +
        card.content + '"></div></div>';

      this.cardsElem.innerHTML += cardElem;
    },

    // 获取试图上的所有卡片
    cards: function() {
      return this._cards || (this._cards = doc.querySelectorAll(".card"));
    },

    // 翻转卡片
    flipCard: function(index) {
      var cardElem = this.cards()[index];

      cardElem.classList.toggle("card-flipped");
    },

    // 删除卡片
    removeCard: function(index) {
      var cardElem = this.cards()[index];

      cardElem.parentNode.removeChild(cardElem);
    },

    // 获取卡片下标
    getIndexOfCards: function(cardElem) {
      return Array.prototype.indexOf.call(this.cards(),
        cardElem);
    },

    // 更新时间
    updateTime: function(time) {
      var timeElem = doc.querySelector(".time_value");
      var m = Math.floor(time / 60);
      var s = time % 60;

      m = (m < 10 ? ("0" + m) : m);
      s = (s < 10 ? ("0" + s) : s);

      timeElem.innerHTML = m + ":" + s;
    },

    // 绑定事件
    addEvents: function() {
      delegate(doc.body, "click", clickEvent);
    },

    // 清除所有事件，因为这里使用事件委托，将所有事件绑定在body上，所以只需要清除body上绑定的事件
    removeEvents: function() {
      var old_body = doc.body;
      var new_body = old_body.cloneNode(true);

      old_body.parentNode.replaceChild(new_body, old_body);
    },

    // 监听
    action: pubsub()

  };

  // 发布/订阅系统
  function pubsub() {
    var lib = {};

    return {

      // 发布
      fire: function(subject, args) {
        if (lib[subject]) {
          lib[subject].forEach(function(handler) {
            handler.apply(this, args);
          });
        }
      },

      // 订阅
      on: function(subject, handler) {
        var observer = lib[subject];

        if (!observer) {
          observer = lib[subject] = [];
        }

        observer.push(handler);
      },

      // 取消订阅
      off: function(subject, handler) {
        var observer = lib[subject];

        if (observer) {
          if (handler) {
            var i = observer.indexOf(handler);

            if (i !== -1) {
              observer.splice(i, 1);
            }
          } else {
            observer.length = 0;
          }
        }
      }

    }; // return end
  } // pubsub end

  // 事件代理器
  function delegate(elem, subject, table) {
    var selectors = Object.keys(table);

    elem.addEventListener(subject, function(e) {
      var target = e.target;

      selectors.forEach(function(selector) {
        if (target.matches(selector)) {
          this[selector].call(target, e);
        }
      }, table);
    });
  }

  window.view = view;
})(window.document);
