'use strict';

var RateLimit = require('./model/ratelimit.js')
	, error = 
	{
		code: 429,
		message: 'Rate limit has been reached'
	};

/**
 * @class hapi-ratelimit-mongoose
 */
module.exports = {};

/**
 * @public
 *
 * @var {string} name
 * @memberOf hapi-ratelimit-mongoose
 *
 * @description
 * The name that used by hapi.js to load this plug-in
 */
module.exports.name = 'hapi-ratelimit-mongoose';	

 /**
  * @public
  *
  * @function register
  * @memberOf hapi-ratelimit-mongoose
  *
  * @description
  * Handles the rate limit based on the client IP
  * 
  * @param {{}} server
  * @param {{}} option
  * @param {{}} next
  */
module.exports.register = function (server, options, next) {

	var ratelimit = new RateLimit()
		, err = null;


	server.ext('onPreAuth', function(request, reply) {
		var route = request.route
			, isGlobal = false
			, routeLimit = route.settings.plugins['hapi-ratelimit-mongoose'] || options.global;

		if (options.global) {

			isGlobal = true;
		}

		if (routeLimit) {

			var ip = request.info.remoteAddress+(isGlobal?'':request.path)
				, timestamp = new Date().getTime();

			RateLimit.findOne({ip: ip},  function(err, doc){

				if (err) {
					console.log('Error in hapi rate limit plugin. Check your mongodb connection and if mongoose are correctly installed.')

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

/**
 * @public
 *
 * @var {{}} attributes
 * @memberOf hapi-ratelimit-mongoose.register
 * 
 * @description
 * Required by the hapi.js plug-in system
 */
module.exports.register.attributes = 
{
	pkg: require('../package.json')
};
