$$
({
	helloWorld :
	{
		do_say_hello_world : function()
		{
			$$.helloWorld.sayHello();
		},
		sayHello : function()
		{
			console.log('Hello World! The Add-on was loaded.');
		}
	}
})