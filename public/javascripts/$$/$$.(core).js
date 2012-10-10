$$
({
	do_init_core : function()
	{

		$$.state = {lastResize:0};

		// Where are we?
		$$.state.kernalLocation = $('body script[src*=\\$\\$\\/\\$\\$\\.js]').attr('src');
		if ( typeof $$.state.kernalLocation != 'undefined' )
		{
			$$.state.kernalRoot = $$.state.kernalLocation.substr(0,$$.state.kernalLocation.indexOf('$$/$$.js'));
		}
		else
		{
			$$.state.kernalRoot = '/javascripts/';
		}


		// What are we?
		var ua = navigator.userAgent.toLowerCase();
		$$.state.isIE = ua.indexOf("msie") > -1;
		$$.state.isSafari = ua.indexOf("safari") > -1;
		$$.state.isWebkit = ua.indexOf("webkit") > -1;
		$$.state.isOpera = ua.indexOf("presto") > -1;
		$$.state.isChrome = ua.indexOf("chrome") > -1;
		$$.state.isFirefox = ua.indexOf("firefox") > -1;
		$$.state.isIpad = ua.indexOf("ipad") > -1;
		$$.state.isIphone = ua.indexOf("iphone") > -1;
		$$.state.isIpod = ua.indexOf("ipod") > -1;
		$$.state.isAndroid = ua.indexOf("android") > -1;
		$$.state.isWebOS = ua.indexOf("webos") > -1;
		$$.state.browserVersion = parseFloat($.browser.version);
		$$.state.isIOS = $$.state.isIpad || $$.state.isIpod || $$.state.isIphone ? true : false;
		$$.state.isSafari = $$.state.isSafari && $$.state.isChrome ? false : $$.state.isSafari;
		$$.state.isMac = ua.indexOf("os x") > -1;
		$$.state.isWindows = ua.indexOf("windows") > -1;
		$$.state.isMobile = $$.state.isIOS || $$.state.isAndroid ? true : false;
		$$.state.isTablet = $$.state.isIpad ? true : false;
		$$.captureWinSize();

		$(document).ready(function()
		{
			for ( var isClass in $$.state )
			{
				if ( isClass.substr(0,2) == 'is' && $$.state[isClass] )
				{
					$('body').addClass(isClass);
				}
			}
		});

		$(window).resize(function() 
		{
			$$.captureWinSize();
		});
		
		
	},
	
	getRegex : function(regex,string)
	{
		var matches = string.match(regex);
		if ( matches )
		{
			return string.match(regex)[1];
		}
		return false;
	},
	
	captureWinSize : function()
	{
		// Use .resizing .yourclass to remove box shadows and optimize responsiveness
		$('body').addClass('resizing');
		$$.state.lastResize = $$.timeStamp();
		setTimeout(function()
		{
			if ( $$.timeStamp() - $$.state.lastResize > 100 )
			{
				$('body').removeClass('resizing');
			}
		},200);
		
		$$.state.winHeight = $(window).height();
		$$.state.winWidth = $(window).width();
		return { width: $$.state.winHeight, height: $$.state.winWidth };
	},
	
	xPos : function(selector)
  	{
  		var pos = $(selector).offset();
  		return pos.left;
  	},
  	
  	yPos : function(selector)
  	{
  		var pos = $(selector).offset();
  		return pos.top;
  	},
  	
  	timeStamp : function()
	{
		var date = new Date;
		var timeStamp = date.getTime();
		return timeStamp;
	},
	
	getAddOn : function(addOnPath,callback)
	{
		$.get
		(
			addOnPath,
			function()
			{
				if ( typeof callback == 'function' )
				{
					setTimeout(function()
					{
						callback();
					},500);
				}
			},
			"script"
		);
	},
	
	exists : function (path) 
	{
		var parts = path.split('.');
		var lookup = $$;
		for (var i = 0; i < parts.length; i++) 
		{
			lookup = lookup[parts[i]];
			if ( typeof lookup == 'undefined' ) return false;
		}
		return true;    
	},
	
	isNumeric : function(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	
	parseNum : function(strNum)
	{
		if ( strNum.indexOf('.') > -1 )
		{
			return parseFloat(strNum);
		}
		return parseInt(strNum);
	},
	
	rand : function(from,to)
	{
		return Math.floor(Math.random() * (to - from + 1)) + from;	
	},
	
	stopEvent : function(event)
	{
		if ( event !== undefined )
		{
			if ( $.browser.msie )
			{
				var hasCancelBubble = false;
				for ( var prop in window.event )
				{
					if ( prop == 'cancelBubble' )
					{
						hasCancelBubble = true;
					}
				}
				
				if ( hasCancelBubble )
				{
					window.event.cancelBubble = true;
				}
				else
				{
					// mmm. nice ie decided to remove this property in later browsers
					event.stopPropagation();
				}
			}
			else
			{
				event.stopPropagation();
			}
		}
	},
	
	isValidEmail : function(email)
	{
		return email.match(/[_a-zA-Z0-9\'-]+(\.[_a-zA-Z0-9\'-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/g);	
	},
	
	getUUID : function()
	{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
		{
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	isFormTrigger: function (e)
	{
		if ( (e.keyCode == 13 && e.shiftKey!= 1 ) || e.type === 'click' || e.type == 'submit' )
		{
			return true;
		}
		return false;
	},
	
	popUrl : function(url)
	{
		window.open(url);
	}
			
})