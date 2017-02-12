/**
 * 游戏的卡片模型
 */
;
(function(card) {
  "use strict";

  // 创建PlayingCard类，并继承自Card类
  function PlayingCard() {
    this.superClass = card.Card;
    this.superClass.call(this);
    this.constructor = PlayingCard;
  }

  PlayingCard.prototype = Object.create(card.Card.prototype);

  // 其他方法
  var playingCardMethods = {

    // 卡片的匹配方法
    match: function(otherCards) {
      var isMatch = false;

      if (Array.isArray(otherCards)) {
        otherCards.forEach(compare, this);
      } else {
        compare.call(this, otherCards);
      }

      // 借用比较函数进行匹配
      function compare(card) {
        if (card.content() === this.content()) {
          isMatch = true;
        }
      }

      return isMatch;
    }

  };

  // 将其他方法加到PlayingCard的原型方法中
  Object.keys(playingCardMethods).forEach(function(name) {
    this[name] = playingCardMethods[name];
  }, PlayingCard.prototype);

  function exports() {
    return new PlayingCard();
  }

  exports.PlayingCard = PlayingCard;

  window.playingCard = exports;
})(window.card);
