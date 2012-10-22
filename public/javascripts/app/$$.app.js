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
				$$.home.ui.resizeContent();
				$('#yield').scrollspy({offset:43});
				//$('#yield').jScrollPane();
				//$('#yield').jScrollPane();
				if ( routingParms.hash === undefined )
				{
					routingParms.hash = 'home';
				}
				
				if ( $('a[name="hash:'+routingParms.hash+'"]').length == 0 )
				{
					$$.goURL("./");
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
					//console.log('lol');
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
			do_bindResizeContent : function()
			{
				//$$.home.ui.resizeContent();
				//$$.home.ui.setMinContentWidth();

				$(window).resize(function() 
				{
					$$.home.ui.resizeContent();
				});
			}
		},
		
		ui :
		{
			resizeContent : function()
			{
				$('#yield').css({height:$$.state.winHeight-42});
			},
			setMinContentWidth : function()
			{
				$('#yield').css({minWidth:$('#top-menu').width()});
			},
			buildHome : function() {
				var template = _.template([
					"<a name='hash:home'></a>",
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