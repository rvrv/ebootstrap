$$
({
	
	/*
	$$.bindOnce
	(
		selector : 'body',
		event : 'mouseover',
		callback : function()
		{
			if ( $$.state.curRoute == 'user/account' )
			{
				$('.icon.gear').css('opacity',0.2);
				$$.popup.close();
			}
		}
	)
	*/
	
	bindOnce :
	{
		binded : {},
		default : function(options)
		{			
			var bindId = options.selector.toString()+options.event.toString();
			
			if ( typeof $$.bindOnce.binded[bindId] != 'undefined' )
			{
				return;
			}
						
			$$.bindOnce.binded[bindId] = true;

			$(options.selector).bind(options.event,function()
			{
				options.callback();	
			});
		}
	},
	
	click : function(jqSelector,onDown,onUp)
	{
		if ( typeof onDown != 'function' )
		{
			onDown = function(){};
		}

		if ( $$.state.isIOS || $$.state.isAndroid )
		{
			
			$(jqSelector).bind('touchstart',function(event)
			{
				if ( this.nodeName.toLowerCase() != 'select' )
				{
					event.preventDefault();
				}
				
				var touchedThis = this;
								
				$(touchedThis).addClass('pushed');

				setTimeout(function()
				{
					typeof onUp == 'function' ? onDown(event,touchedThis) : false;
				},1);

				$(window).bind('touchend',function(event)
				{
					$(touchedThis).removeClass('pushed');
	
					// If touchend x,y falls within bounds of object, then it was clicked
					var itemX = $$.xPos(touchedThis);
					var itemY = $$.yPos(touchedThis);
					var itemW = $(touchedThis).outerWidth();
					var itemH = $(touchedThis).outerHeight();
					
					var endX = event.originalEvent.changedTouches[0].pageX;
					var endY = event.originalEvent.changedTouches[0].pageY;
					
					if ( ( endX > itemX && endX < itemX+itemW ) && ( endY > itemY && endY < itemY+itemH ) )
					{
						setTimeout(function()
						{
							typeof onUp == 'function' ? onUp(event,touchedThis) : onDown(event,touchedThis);
						},1);
					}
					
					$(window).unbind('touchend');
	
				});

			}).click(function(){ return false; });
		}
		else
		{
			$(jqSelector).mousedown(function(event)
			{				
				$(this).addClass('pushed');
				typeof onUp == 'function' ? onDown(event,this) : false;	
			}).mouseup(function(event)
			{
				$(this).removeClass('pushed');	
			}).click(function(event)
			{
				typeof onUp == 'function' ? onUp(event,this) : onDown(event,this);
				return false;
			});
		}
	}

})