$$
({
	popup :
	{
		tpl :
		{
			popup : function(popupId,htmlContent,extraClass)
			{
				var html = ''+
				'<div id="'+popupId+'" class="popup '+( extraClass !== undefined ? extraClass : '' )+'">'+
						htmlContent+
				'</div>';
				return html;
			},
			
			systemPopup : function(htmlContent,forceWidth)
			{
				var style = (forceWidth!==undefined?'width: '+forceWidth+'px':'');
				var html = ''+
				'<div class="systemPopup" style="'+style+'">'+
					htmlContent+
				'</div>';
				return html;
			},
			
			alert : function(str)
			{
				var html = ''+
				'<div class="alert">'+
					str+
					'<div class="actions">'+
						'<a class="button ok-button nodrag" href="#">OK</a>'+
					'</div>'+
				'</div>';
				return html;
			},
			
			prompt : function(str)
			{
				var html = ''+
				'<div class="alert">'+
					str+
					'<div class="actions">'+
						'<a class="button ok-button nodrag" href="#">OK</a>'+
						'<a class="button cancel-button nodrag" href="#">CANCEL</a>'+
					'</div>'+
				'</div>';
				return html;
			}
		}
	}
})