$$
({
	css_files : 
	[
		'$$/add-ons/client/$$.growl/growl.css'
	],
	
	js_files : 
	[
		'$$/add-ons/client/$$.growl/jquery.gritter.js'
	],
	
	growl : function(parms)
	{
		if ( typeof parms == 'string' )
		{
			parms = { message: parms };
		}

		$.gritter.add
		({
			title: 'System Message',
			text: parms.message,
			sticky:parms.sticky!==undefined&&parms.sticky===true?true:false,
			time:parms.time!==undefined?parms.time*1000:5000
		});
	}
})