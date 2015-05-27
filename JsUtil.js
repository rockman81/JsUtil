JsUtil = {
	/*
	*
	* input:지정컨테이너(string)
	* allowed:살려놓을 태그(ex. <img><div><b>)
	* @ return input의 텍스트에서 태그를 제외하고 리턴해준다.
	* @ type String
	* */
	strip_tags:function (input, allowed) 
	{
	    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''; 	});
	},

	/*
	* codeKey:쿠키의 키값
	* codeValue:쿠키의 키값에 대한 value 값
	* codeDay:쿠키 날짜 설정 값
	* @ return void
	* */
	setCookie:function(codeKey, codeValue, codeDay){
		var expire = new Date();
		expire.setDate(expire.getDate() + codeDay);
		cookies = codeKey + '=' + escape(codeValue) + '; path=/ ';
		if(typeof codeDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
		document.cookie = cookies;
	},

	/*
	* codeKey:setCookie 에서 저장했던 codeKey
	* @ return codeKey값에 대한 codeValue값 리턴
	* @ type String
	* */
	getCookie:function(codeKey){
		codeKey = codeKey + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(codeKey);
		var codeValue = '';
		if(start != -1){
			start += codeKey.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			codeValue = cookieData.substring(start, end);
		}
		return unescape(codeValue);
	},

	/*
	* name:url 파라미터의 키값 입력
	* @ return 키값에 대한 파라미터의 value값 리턴
	* @ type String
	* */
	getURLParameter:function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	},

	/*
	* @ return 익스플로러 버전 가져옴
	* @ type Number
	* */
	getInternetExplorerVersion:function()
	{
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') 
		{
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
		}
		return rv;
	}
};