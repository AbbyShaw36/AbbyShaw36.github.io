/**
 * 游戏的桌面模型
 */
;
(function(desk, playingPairCards) {
  "use strict";

  // 创建PlayingDesk类， 集成自Desk类
  function PlayingDesk() {
    var pairCards = playingPairCards();

    // 初始化桌面的卡片
    while (pairCards.cards().length) {
      this.addCard(pairCards.getRandomCard());
    }
  }

  PlayingDesk.prototype = Object.create(desk.Desk.prototype);

  // 其他方法
  var playingDeskMethods = {};

  // 将其他方法加到PlayingDesk的原型方法中
  Object.keys(playingDeskMethods).forEach(function(name) {
    this[name] = playingDeskMethods[name];
  }, PlayingDesk.prototype);

  function exports() {
    return new PlayingDesk();
  }

  exports.PlayingDesk = PlayingDesk;

  window.playingDesk = exports;
})(window.desk, window.playingPairCards);
