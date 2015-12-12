# hapi-ratelimit-mongoose  

[![NPM](https://nodei.co/npm/hapi-ratelimit-mongoose.png)](https://nodei.co/npm/hapi-ratelimit-mongoose/)  

[![NPM](https://nodei.co/npm-dl/hapi-ratelimit-mongoose.png)](https://nodei.co/npm/hapi-ratelimit-mongoose/) 

This package is a Hapi.js plugin based on MongoDB that give a global rate limit control on your app/API. 
You can also set up some specific rate limits on each route config.

## Getting started

Go in your project root directory and install with npm:
```
npm install hapi-ratelimit-mongoose --save
```

#### Global rate limit setup

```js
//server.js or app.js ... (anywhere you setup your server)

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

#### Route rate limit setup

```js
//route.js or main.js ... (anywhere you define a route)

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

##Todo

* Setup unit test (so refactor & review some part of the code)
* Add way to store IP/timestamp, not just mongoDB (JSON for example...). Then, allow to choose the storage system in the options parameter.
