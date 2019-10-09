var clientHeight = function() {
	return document.documentElement.clientHeight || document.body.clientHeight;
}

// 判断设备类型
var deviceType = (function() {
	var ua = window.navigator.userAgent.toLocaleLowerCase();
	return {
		isIOS: /iphone|ipad|ipod/.test(ua),
		isAndroid: /android/.test(ua),
		isMiuiBrowser: /miuibrowser/.test(ua),
		isSafari: /Safari/i.test(ua) && !/Chrome/i.test(ua)
	};
})();

//判断是否是输入元素
var isEditableDom = function(dom) {
	var editable = dom.getAttribute("contenteditable");
	// 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
	if (
		dom.tagName == "INPUT" ||
		dom.tagName == "TEXTAREA" ||
		editable === "" ||
		editable
	) return true
	return false;
};

//判断是否是微信浏览器
var isWxBrowser = (function() {
	// 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
	var wechatInfo = window.navigator.userAgent.match(
		/MicroMessenger\/([\d\.]+)/i
	);
	//微信浏览器
	if (wechatInfo) {
		var wechatVersion = wechatInfo[1];
		var version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
			return true;
		}
	}
	return false;
})();
