$$
({
	do_init_router : function()
	{
		$$.state.prevRoute = '';
		$$.state.currentRoute = '';
		$$.state.routeHistory = [];
		
		$(window).hashchange( function(event)
		{

			var isExitHook = false;
			
			if ( $$.state.currentRoute != '' )
			{
				var routeObj = $$.parseRoute($$.state.currentRoute);
				isExitHook =  $$.exists(routeObj.controller+'.route.'+routeObj.subController+'ExitHook');
			}
			
			// If a special exit hook is coded into this route
			if ( isExitHook )
			{
				$$[routeObj.controller]['route'][routeObj.subController+'ExitHook'](function()
				{
					$$.goRoute($$.getHash(),true);
				});
			}
			// If no exit hool then try to close popups that were just opened
			else if ( $$.state.currentRoute != '' && $$.exists('popup.close') )
			{
				$$.popup.close(undefined,function()
				{
					$$.goRoute($$.getHash(),true);
				});
			}
			// First time in
			else
			{
				$$.goRoute($$.getHash(),true);
			}
		});
	},
	
	startRouter : function()
	{
		$(document).ready(function()
		{
			setTimeout(function()
			{
				$$.go($$.isHash()?$$.getHash():'home');
			},0);
					
			// Slow the hook polling rate down after first screen draw
			setTimeout(function()
			{
				__ddHookPollTimeOut = 1000;
			},250);
		});
	},

	go : function(route,isHashChange)
	{
		route=route.replace(/^\#/g,'');
			
		// This stops un-required redirect to #home when opening the app
		if ( $$.getHash() == route || route == 'home' || isHashChange === true )
		{
			$$.goRoute(route);
		}
		else
		{
			$$.goHash(route);
		}
	},
	
	goHash : function(route)
	{
		location.hash = route;
	},
	
	goURL : function(url)
	{
		location.href=url;
	},
	
	getHash : function()
	{
		if ( $$.isHash() )
		{
			return location.hash.substr(1,location.hash.length-1);
		}
		return '';
	},
	
	isHash : function()
	{
		return location.hash.length > 0;
	},
		
	parseRoute : function(route)
	{
		var routeObj =
		{
			controller : false,
			subController : false,
			parameters : {}
		}
		
		// If no route then default to home
		if ( route == '' )
		{
			route = 'home';
		}
		
		// If home route with routing parms
		if ( route.indexOf('/') == -1 && route.indexOf(':') > -1 )
		{
			route = 'home/'+$$.camelizeRouteSegment(route);
		}
				
		if ( route.indexOf('/') > -1 )
		{
			var parts = route.split('/');
			routeObj.controller = $$.camelizeRouteSegment(parts[0]);
			routeObj.subController = typeof parts[1] != 'undefined' && parts[1].indexOf(':') == -1 ? $$.camelizeRouteSegment(parts[1]) : false;
			routeObj.parameters = $$.parseRouteVars(route);
		}
		else
		{
			routeObj.controller = $$.camelizeRouteSegment(route);
		}
		
		// Default route for subController
		if ( routeObj.controller !== false && routeObj.subController === false )
		{
			routeObj.subController = 'default';
		}
		
		return routeObj;
	},

	camelizeRouteSegment : function(segment)
	{
		if ( segment.indexOf('-') > -1 )
		{
			var camelized = '';
			var parts = segment.split('-');
			for ( var i in parts )
			{
				if ( parseInt(i) > 0 )
				{
					camelized += parts[i].substr(0,1).toUpperCase()+parts[i].substr(1,parts[i].length-1);
				}
				else
				{
					camelized += parts[i];
				}
			}
			return camelized;
		}
		return segment;
	},
	
	buildRouteVars : function(obj)
	{
		var routeVarStr = '';
		for ( var prop in obj )
		{
			routeVarStr += '/'+prop+':'+escape(obj[prop]);
		}
		return routeVarStr;
	},
	
	parseRouteVars : function(route)
	{
		var parts = route.split('/');
		var routeVars = {};

		for ( var part in parts )
		{
			if ( parts[part].indexOf(':') > -1 )
			{
				var parm = parts[part].split(':');
				routeVars[parm[0]] = unescape(parm[1]);
			}
		}
		
		return routeVars;
	},
	
	goRoute : function(route)
	{
		$$.state.prevRoute = $$.state.currentRoute;
		$$.state.currentRoute = route;
		
		var routeObj = $$.parseRoute(route);
				
		// If main controller doesn't exist and defaultOnly
		if ( ! $$.exists(routeObj.controller+'.route') && $$.exists('home.route.defaultOnly') && $$.home.route.defaultOnly === true )
		{
			routeObj.controller = 'home';
			routeObj.subController = 'default';
			routeObj.parameters = {hash:(route=='home'?undefined:route)};
		}

		// If main controller does exist and defaultOnly
		else if ( $$.exists(routeObj.controller+'.route.defaultOnly') && $$[routeObj.controller].route.defaultOnly === true )
		{
			routeObj.subController = 'default';
			routeObj.parameters = {hash:(route==routeObj.controller?undefined:route)};
		}
	
		// Route to a valid sub controller
		if ( routeObj.controller !== false && routeObj.subController !== false && typeof $$[routeObj.controller] != 'undefined' && typeof $$[routeObj.controller]['route'][routeObj.subController] != 'undefined' )
		{
			$$[routeObj.controller]['route'][routeObj.subController](routeObj.parameters);
		}
		// Non existent route
		else
		{
			$$.pageNotFound(routeObj);
			return;
		}
		
		if ( $$.state.routeHistory !== undefined )
		{
			$$.state.routeHistory.unshift(route);
		}
	},
	
	goBackOrHome : function()
	{
		if ( $$.state.routeHistory.length > 1 )
		{
			history.back();
		}
		else
		{
			$$.goHash('home');
		}
	},
	
	pageNotFound : function(routeObj)
	{
		$('body').html('Sorry, we were unable the page #'+routeObj.controller+'/'+routeObj.subController);
	}
})