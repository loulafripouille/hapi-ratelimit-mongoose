'use strict';

var mongoose = require('mongoose')
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
	, RateLimit = mongoose.model('RateLimit', ratelimiteSchema);

module.exports = RateLimit;