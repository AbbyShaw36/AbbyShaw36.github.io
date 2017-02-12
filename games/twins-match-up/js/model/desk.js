/**
 * 桌面模型
 */
;
(function() {
  "use strict";

  function Desk() {}

  Desk.prototype = {

    // 获取桌面上的卡片
    cards: function() {
      return this._cards || (this._cards = []);
    },

    // 添加桌面卡片
    addCard: function(card) {
      card.index = this.cards().length;
      this.cards().push(card);
    }

  };

  function exports() {
    return new Desk();
  }

  exports.Desk = Desk;

  window.desk = exports;
})();
