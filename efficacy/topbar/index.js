(function() {
  var Address = {
    areas: [{
      id: 1,
      value: "北京"
    }, {
      id: 2,
      value: "天津"
    }, {
      id: 3,
      value: "河北"
    }, {
      id: 4,
      value: "山西"
    }, {
      id: 5,
      value: "内蒙古"
    }, {
      id: 6,
      value: "辽宁"
    }, {
      id: 7,
      value: "吉林"
    }, {
      id: 8,
      value: "黑龙江"
    }, {
      id: 9,
      value: "上海"
    }, {
      id: 10,
      value: "江苏"
    }, {
      id: 11,
      value: "浙江"
    }, {
      id: 12,
      value: "安徽"
    }, {
      id: 13,
      value: "福建"
    }, {
      id: 14,
      value: "江西"
    }, {
      id: 15,
      value: "山东"
    }, {
      id: 16,
      value: "河南"
    }, {
      id: 17,
      value: "湖北"
    }, {
      id: 18,
      value: "湖南"
    }, {
      id: 19,
      value: "广东"
    }, {
      id: 20,
      value: "广西"
    }, {
      id: 21,
      value: "海南"
    }, {
      id: 22,
      value: "重庆"
    }, {
      id: 23,
      value: "四川"
    }, {
      id: 24,
      value: "贵州"
    }, {
      id: 25,
      value: "云南"
    }, {
      id: 26,
      value: "西藏"
    }, {
      id: 27,
      value: "陕西"
    }, {
      id: 28,
      value: "甘肃"
    }, {
      id: 29,
      value: "青海"
    }, {
      id: 30,
      value: "宁夏"
    }, {
      id: 31,
      value: "新疆"
    }, {
      id: 32,
      value: "台湾"
    }, {
      id: 33,
      value: "香港"
    }, {
      id: 34,
      value: "澳门"
    }, {
      id: 35,
      value: "钓鱼岛"
    }],
    init: function() {
      var valueObj = document.querySelector(".js-address-value");
      var defaultItem = this.areas[0];

      valueObj.innerHTML = defaultItem.value;
      valueObj.setAttribute("data-value", defaultItem.id);
      this.create();
    },
    create: function() {
      var selectObj = document.querySelector(".js-address-select");
      var areas = this.areas;
      var length = areas.length;
      var i = 0;
      var html = "";

      for (i; i < length; i++) {
        var option = areas[i];

        html += '<li><a href="javascript:void(0);" data-value="' +
          option.id + '">' + option.value + '</a></li>';
      }

      selectObj.innerHTML = html;
      this.addEvent();
    },
    addEvent: function() {
      var options = document.querySelectorAll(".js-address-select li a");
      var valueObj = document.querySelector(".js-address-value");
      var length = options.length;
      var i = 0;

      for (i; i < length; i++) {
        var option = options[i];

        option.addEventListener("click", function() {
          console.log(this);
          valueObj.innerHTML = this.innerHTML;
          valueObj.setAttribute("data-value", this.getAttribute(
            "data-value"));
        });
      }
    }
  };

  window.onload = function() {
    Address.init();
  }
})();
