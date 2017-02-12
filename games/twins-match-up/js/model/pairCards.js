/**
 * 整副卡片模型
 */
;
(function() {
  "use strict";

  function PairCards() {}

  PairCards.prototype = {

    // 获取整副卡片
    cards: function() {
      return this._cards || (this._cards = []);
    },

    // 添加卡片
    addCard: function(card) {
      this.cards().push(card);
    },

    // 随机抽取卡片
    getRandomCard: function() {
      var randomCard,
        cards = this.cards();

      if (cards.length) {
        var index = parseInt(Math.random() * cards.length);

        randomCard = cards[index];
        cards.splice(index, 1);
      }

      return randomCard;
    }

  };

  function exports() {
    return new PairCards();
  }

  exports.PairCards = PairCards;

  window.pairCards = exports;
})();
