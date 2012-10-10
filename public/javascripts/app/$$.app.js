$$
({
	home :
	{	
		route :
		{
			defaultOnly : true,
			
			default : function(routingParms)
			{
				$$.home.ui.buildHome();
				if ( routingParms.hash === undefined )
				{
					routingParms.hash = 'welcome';
				}
				
				if ( $('a[name="hash:'+routingParms.hash+'"]').length == 0 )
				{
					//$$.goURL("./");
				}
				
				// Nice scrolling speed no matter how far/close the content is
				var scrollTop = Math.abs($('#yield').scrollTop());
				var hashY = $$.yPos('a[name="hash:'+routingParms.hash+'"]')+scrollTop;
				var scrollSpeed = Math.round(Math.max(scrollTop,hashY) - Math.min(scrollTop,hashY))*.9;
	
				// Let's scroll it
				if ( scrollSpeed <= 4000 )
				{
					$('#yield').css({opacity:1});
					$('#yield').scrollTo('a[name="hash:'+routingParms.hash+'"]',Math.min(2000,scrollSpeed), {axis:'y'} );
				}
				// Too far, let's fade it
				else
				{
					$('#yield').css({opacity:0});
					$('#yield').scrollTo('a[name="hash:'+routingParms.hash+'"]',0, {axis:'y'} );
					$('#yield').animate({opacity:1},250);
				}
			}
		},
		
		bind :
		{
			do_buildHome : function()
			{
				//$$.home.ui.buildHome();
			}
		},
		
		ui :
		{
			buildHome : function() {
				var template = _.template([
					"<a name='hash:welcome'></a>",
					"<div class='page' id='page-home'>Home</div>",
					"<a name='hash:about'></a>",
					"<div class='page' id='page-about'>About</div>",
					"<a name='hash:pricing'></a>",
					"<div class='page' id='page-pricing'>Pricing</div>",
					"<a name='hash:signup'></a>",
					"<div class='page' id='page-signup'>Signup</div>"
				].join(' '))
				$('#yield').html(template)
			}
		}
	}
})