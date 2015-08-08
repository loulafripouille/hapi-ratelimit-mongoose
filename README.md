# hapi-ratelimit-mongoose

This package is a Hapi.js plugin based on MongoDB that give a global rate limit control on your app/API. 
You can also set up some specific rate limits on each route config.

###Global rate limit setup

```
server.register({
	register: require('hapi-ratelimit-mongoose'),
	options: {
		global: {
			limit: 20,
			duration: 5000
		}
	}
}, function(err) {
		console.log(err||'Ratelimit plugin is loaded');
});
```

###Route rate limit setup

```
server.route({
    method: 'GET',
    path: '/',
    config: { 
	    plugins: { 
			'hapi-ratelimit-mongoose': {
				limit: 200,
				duration: 5000
			}
	   }
	}
});
```