var date = new Date;
var noCache = '?'+date.getTime();

head.js
(
	// jQuery
	'/javascripts/others/underscore.min.js'+noCache,
	'/javascripts/jquery/jquery-1.8.2.min.js'+noCache,
	'/javascripts/jquery/jquery-ui.min.js'+noCache,
	'/javascripts/jquery/jquery.ba-hashchange.min.js'+noCache,
	'/javascripts/jquery/jquery.scrollTo.min.js'+noCache,
	'/javascripts/jquery/jquery.mousewheel.js'+noCache,
	'/javascripts/jquery/jquery.mCustomScrollbar.min.js'+noCache,
	'/javascripts/others/bootstrap.scrolspy.js'+noCache,
	
	// DoubleDollar
	'/javascripts/$$/$$.js'+noCache,
	'/javascripts/$$/$$.(hooks).js'+noCache,
	'/javascripts/$$/$$.(core).js'+noCache,
	'/javascripts/$$/add-ons/client/$$.(router).js'+noCache,
	'/javascripts/$$/add-ons/client/$$.(bindings).js'+noCache,
	'/javascripts/$$/add-ons/client/$$.content/$$.content.js'+noCache,
	
	// *** Your custom app ***
	'/javascripts/app/$$.app.js'+noCache,
	
	function()
	{
		$$.startRouter();
	}
);