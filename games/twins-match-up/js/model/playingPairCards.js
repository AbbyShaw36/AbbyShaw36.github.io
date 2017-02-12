/**
 * 游戏的整副卡片模型
 */
;
(function(pairCards, playingCard) {
  "use strict";

  // 卡片的装饰
  var _cardDecks = [
    "cardAQ", "cardAK", "cardCK", "cardBQ",
    "cardCQ", "cardBK", "cardDQ", "cardDK"
  ];
  // 整副卡片的对数
  var _pairs = 6;

  // 创建PlayingPairCards，继承自PairCards
  function PlayingPairCards() {
    var randomDeck, i;

    this.superClass = pairCards.PairCards;
    this.superClass.call(this);
    this.constructor = PlayingPairCards;

    // 初始化整副卡片
    for (i = 0; i < _pairs; i++) {
      randomDeck = _cardDecks[Math.floor(Math.random() * _cardDecks.length)];
      this.createCard(randomDeck);
      this.createCard(randomDeck);
    }
  }

  PlayingPairCards.prototype = Object.create(pairCards.PairCards.prototype);

  // 其他方法
  var playingPairCardsMethods = {

    // 创建卡片
    createCard: function(v) {
      var card = playingCard();

      card.content(v);
      this.addCard(card);
    }

  };

  // 将其他方法加到PlayingPairCards的原型方法中
  Object.keys(playingPairCardsMethods).forEach(function(name) {
    this[name] = playingPairCardsMethods[name];
  }, PlayingPairCards.prototype);

  function exports() {
    return new PlayingPairCards();
  }

  exports.PlayingPairCards = PlayingPairCards;

  window.playingPairCards = exports;
})(window.pairCards, window.playingCard);
