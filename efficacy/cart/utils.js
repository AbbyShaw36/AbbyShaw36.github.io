var $ = {};

$.get = function(selector, parent) {
  if (parent) {
    return parent.querySelector(selector);
  }

  return document.querySelector(selector);
};

$.getAll = function(selector, parent) {
  if (parent) {
    return parent.querySelectorAll(selector);
  }

  return document.querySelectorAll(selector);
};

$.each = function(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i, collection);
  };
};

$.hasClass = function(elem, className) {
  var classes = elem.className.split(" ");
  var length = classes.length;
  var i = 0;

  for (; i < length; i++) {
    if (classes[i] === className) {
      return true;
    }
  }

  return false;
};

$.addClass = function(elem, newClass) {
  if (this.hasClass(elem, newClass)) {
    return;
  } else {
    elem.className = (elem.className + " " + newClass).replace(
      /(^\s+)|(\s+$)/g, "");
  }
};

$.removeClass = function(elem, className) {
  var classes = elem.className.split(" ");
  var length = classes.length;
  var i = 0;

  for (; i < length; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
    }
  }

  elem.className = classes.join(" ");
};

$.on = function(elem, event, listener) {
  elem.addEventListener(event, listener);
};

$.off = function(elem, event, listener) {
  elem.removeEventListener(event, listener);
};

$.parents = function(elem, className) {
  var parents = [];
  var childNode = elem;
  var parentNode = null;

  while (childNode.nodeName !== "HTML") {
    parentNode = childNode.parentNode;
    childNode = parentNode;

    if (className) {
      if ($.hasClass(parentNode, className)) {
        return parentNode;
      }

      continue;
    }

    parents.push(parentNode);
  }

  return parents;
}
