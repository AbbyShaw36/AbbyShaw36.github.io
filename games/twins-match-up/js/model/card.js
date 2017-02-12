/**
 * 卡片模型
 */
;
(function() {
  "use strice";

  function Card() {
    this.isFlipped = false; // 是否已翻转
    this.isUnplayable = false; // 是否可翻转
  };

  Card.prototype = {

    // 设置或获取卡片内容
    content: function(v) {
      if (v === undefined) {
        return this._content;
      } else {
        return this._content = v;
      }
    }

  };

  function exports() {
    return new Card();
  }

  exports.Card = Card;

  window.card = exports;
})();
