var Hapi = require('hapi')
	, mongoose = require('mongoose')
	, server = new Hapi.Server();

server.connection({ 
		port: process.env.PORT || 3000 ,
		routes: { cors: true }
	});


/**
 * DBConnection
 */
var mongolabStringConnexion = process.env.MONGO_STRING_CONNECTION || 'mongodb://localhost:27017';
mongoose.connect(mongolabStringConnexion);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    console.log('Connection establish to: mongolab');
});



/**
 * Register some plugins
 */
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



/**
 * Routes
 */
server.route({

    method: 'GET',
    path: '/',
    config: { 
        handler: Controller.main,
	    plugins: { 
			'hapi-ratelimit-mongoose': {
				limit: 10,
				duration: 5000
			}
	   }
	}
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
