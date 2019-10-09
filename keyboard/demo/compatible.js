//让当前的元素滚动到浏览器窗口的可视区域内。
var activeElementScrollIntoView = function(activeElement, delay, scrollOption) {
	//是可输入元素
	if (isEditableDom(activeElement)) {
		setTimeout(function() {
			activeElement.scrollIntoView(scrollOption);
			// activeElement.scrollIntoViewIfNeeded();
		}, delay);
	}
}

// 监听输入框的软键盘弹起和收起事件
function listenKeybord($input) {
	if (deviceType.isIOS) {
		// IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
		$input.addEventListener("focus",
			function() {
				console.log("IOS 键盘弹起啦！");
				// Safari 浏览器，`scrollIntoView` 参数设为 `false`，才使得聊天输入框刚好吸附在输入法上，为 `true` 会往上走一点
				activeElementScrollIntoView(this, 1000, !deviceType.isSafari);
			},
			false
		);

		// IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
		$input.addEventListener("blur",
			function() {
				console.log("IOS 键盘收起啦！");
				// 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
				if (isWxBrowser) {
					setTimeout(function() {
						window.scrollTo(0, document.body.scrollTop);
					});
				}
			}, false
		);
	}

	// Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
	else if (deviceType.isAndroid) {
		var originHeight = clientHeight();
		window.addEventListener("resize",
			function() {
				var resizeHeight = clientHeight();
				//悬浮的dom
				var $inputBox = document.querySelector(".input__content");
				//如果窗口变化，让小范围的变化，不影响到布局，因此加了个窗口范围
				if (resizeHeight - originHeight > 100) { //
					console.log("Android 键盘收起啦！");
					// 修复小米浏览器下，输入框依旧被输入法遮挡问题
					if (deviceType.isMiuiBrowser) {
						$inputBox.style.bottom = "0px";
						document.body.style.marginBottom = "40px";
					}
				} else if (originHeight - resizeHeight > 100) {
					console.log("Android 键盘弹起啦！");
					// 修复小米浏览器下，输入框依旧被输入法遮挡问题
					if (deviceType.isMiuiBrowser) {
						$inputBox.style.bottom = "79px";
						document.body.style.marginBottom = "120px";
					}
					activeElementScrollIntoView($input, 1000, true);
				}
				originHeight = resizeHeight;
			},
			false
		);
	}
}
