/**
 * hàm debounce thực thi 1 function sau 1 khoảng thời gian
 * @param {Function} func 
 * @param {Number} wait : milisecond
 * @param {*} immediate 
 */
const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export {
    debounce,
}