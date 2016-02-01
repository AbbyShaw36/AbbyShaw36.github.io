window.onload = function() {
	var oTitle = getByClass($('work'),'title')[0];
	var aTitleLi = oTitle.getElementsByTagName('li');
	var oContent = getByClass($('work'),'content')[0];
	var aContentUl = oContent.getElementsByTagName('ul');

	for (var i = 0; i < aTitleLi.length; i++) {
		aTitleLi[i].onclick = (function(index){
			return function(){
				for (var i = 0; i < aTitleLi.length; i++) {
					aTitleLi[i].className = "";
					aContentUl[i].className = "";
				};
				aTitleLi[index].className = "active";
				aContentUl[index].className = "active";
			}
		})(i);
	};
}