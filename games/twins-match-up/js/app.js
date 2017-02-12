/**
 * 控制层
 */
;
(function(playingDesk, view) {
  "use strice";

  var _flippedCards = []; // 已翻转的卡片
  var _maxFlippedCount = 2; // 最大匹配卡片数，本游戏只对2张卡片进行匹配
  var _delay = 1; // 延时删除或翻转卡片（秒）
  var _time = 20; // 游戏限时（秒）

  // 监听点击卡片翻转事件
  view.action.on("card:flip", function(index) {
    var flippedCount = _flippedCards.length; // 已翻转卡片数
    var card = app.desk().cards()[index]; // 通过卡片下标获取台面上的该卡片

    // 已翻转卡片是否已到达最大匹配卡片数
    if (flippedCount === _maxFlippedCount) {
      return;
    }

    // 该卡片是否已翻转，或者卡片不可翻转
    if (card.isFlipped || card.isUnplayable) {
      return;
    }

    view.flipCard(index); // 视图翻转该卡片
    card.isFlipped = true; // 修改该卡片的已翻转属性

    // 加上当前翻转的卡片是否已经到达最大匹配卡片数
    if (flippedCount + 1 !== _maxFlippedCount) {
      _flippedCards.push(card); // 还没有到达，只是把该卡片放到已翻转卡片中
      return;
    }

    // 已到达，则将该卡片与其他卡片进行比较是否匹配
    if (card.match(_flippedCards)) {

      // 匹配成功，将所有已翻转的卡片删除视图，并修改其可翻转属性，清空已翻转卡片
      _flippedCards.push(card);

      setTimeout(function() {
        _flippedCards.forEach(function(card) {
          this.removeCard(card.index);
          card.isUnplayable = true;
        }, view);
        _flippedCards = [];
        app.win();
      }, _delay * 1000);

    } else {

      // 匹配失败，将所有已翻转卡片视图翻回，并修改其已翻转属性，清空已翻转卡片
      _flippedCards.push(card);

      setTimeout(function() {
        _flippedCards.forEach(function(card) {
          this.flipCard(card.index);
          card.isFlipped = false;
        }, view);
        _flippedCards = [];
      }, _delay * 1000);

    } // else end
  }); // on card:flip end

  // 监听点击游戏开始事件
  view.action.on("game:strat", function() {
    app.start();
  });

  var app = {

    // 获取游戏桌面对象
    desk: function() {
      return this._desk || (this._desk = playingDesk());
    },

    /**
     * 游戏初始化
     * (1)、视图初始化
     * (2)、将所有左面卡片进行视图绘制，初始设置卡片的可翻转属性为不可翻转
     * (3)、视图添加事件
     * (4)、初始化计时器
     * (5)、初始化游戏属性为未开始
     */
    init: function() {
      view.init(); // (1)

      // (2)
      this.desk().cards().forEach(function(card) {
        card.isUnplayable = true;

        view.createCard({
          content: card.content(),
          index: card.index
        });
      });

      view.addEvents(); // (3)

      // (4)
      this.time(_time);
      view.updateTime(this.time());

      this._start = false; // (5)
    },

    /**
     * 游戏开始
     * 如果游戏已开始，则不需要执行
     * 否则，将桌面所有卡片设置为可翻转，修改游戏属性
     * 开始计时
     */
    start: function() {
      if (this._start) {
        return;
      }

      this.desk().cards().forEach(function(card) {
        card.isUnplayable = false;
      });

      this._start = true;
      this.timer();
    },

    /**
     * 定时更新时间
     * 如果时间已为0，则游戏结束
     */
    timer: function() {
      var _this = this;

      return this._timer || (this._timer = setInterval(function() {
        var time = _this.time() - 1;

        if (time === 0) {
          alert("Game over!");
          _this.gameover();
          return;
        }

        _this.time(time);
        view.updateTime(time);
      }, 1000));
    },

    /**
     * 游戏胜利判断
     * 判断所有桌面所有卡片是否都不可翻转
     */
    win: function() {
      var win = true;
      var cards = this.desk().cards();
      var i = 0;
      var length = cards.length;

      for (; i < length; i++) {
        if (!cards[i].isUnplayable) {
          win = false;
          break;
        }
      }

      if (win) {
        alert("You win!");
        this.gameover();
      }
    },

    // 删除定时器
    removeTimer: function() {
      clearInterval(this.timer());
      this._timer = null;
    },

    // 获取或设置游戏当前剩余时间
    time: function(v) {
      if (v === undefined) {
        return this._time;
      } else {
        return this._time = v;
      }
    },

    // 游戏结束，删除事件，重新初始化游戏
    gameover: function() {
      view.removeEvents();

      this._desk = null;
      this.removeTimer();
      this.init();
    }

  };

  window.app = app;
})(window.playingDesk, window.view);
