var mongoose = require('mongoose')
	, internals = {}
	, Schema = mongoose.Schema
	, ratelimiteSchema = new Schema({
			ip: {
				type: String,
				required: true
			},
			lastTimestamp: {
				type: Number,
				required: true
			},
			count: {
				type: Number,
				required: true
			}
	  })
	, RateLimit = mongoose.model('RateLimit', ratelimiteSchema)
<<<<<<< HEAD
	, error = 
	{
=======
	, error = {
>>>>>>> 312165bbda97beeed40a00ff555857000578631a
		code: 429,
		message: 'Rate limit has been reached'
	};

exports.name = 'hapi-ratelimit-mongoose';

<<<<<<< HEAD
/**
 * @param {Object} server
 * @param {Namespace} options
 * @param {function} next
 */
exports.register = function (server, options, next) 
=======
exports.register = function(server, options, next) 
>>>>>>> 312165bbda97beeed40a00ff555857000578631a
{
	var settings = options
		, ratelimit = new RateLimit()
		, err = null;


	server.ext('onPreAuth', function(request, reply) {
		var route = request.route
			, is_global = false
			, routeLimit = route.settings.plugins['hapi-ratelimit-mongoose'] || settings.global;

		if (routeLimit) {

			var ip = request.info.remoteAddress+(is_global?'':request.path)
				, timestamp = new Date().getTime();

			RateLimit.findOne({ip: ip},  function(err, doc){

				if (err) {
<<<<<<< HEAD
					console.log('Error in hapi rate limit plugin. Check your mongodb connection and if mongoose are correctly installed.')
					
=======

>>>>>>> 312165bbda97beeed40a00ff555857000578631a
					return reply.code(500);
				}
				
				if(null !== doc) {

					if ((timestamp - doc.lastTimestamp) < routeLimit.duration)  {
						doc.count += 1;
					} else {
						doc.count = 1;
						doc.lastTimestamp = timestamp;
					}

					doc.save();

				} else {

					doc = new RateLimit();
					doc.ip = ip;
					doc.lastTimestamp = timestamp;
					doc.count = 1;
					doc.save();

				}

				if (doc.count > routeLimit.limit) {

					return reply(error.message).code(error.code);
				}

				return reply.continue();

			});

			

		} else {

			return reply.continue();
		}
	});

	return next();
};
	
<<<<<<< HEAD
exports.register.attributes = 
{
=======
exports.register.attributes = {
>>>>>>> 312165bbda97beeed40a00ff555857000578631a
	pkg: require('../package.json')
};	
