(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  /**
   * Job Schema
   */
  var JobSchema = new Schema({
  	created: {
  		type: Date,
  		default: Date.now
  	},
  	employer: {
  		type: Schema.ObjectId,
  		ref: 'User',
  		required: 'Employer is mandatory'
  	},
    employerName: {
      type: String,
      required: 'Employer is mandatory'
    },
  	address: {
  		type: Schema.ObjectId,
  		ref: 'Address'
  	},
  	title: {
  		type: String,
  		default: '',
  		trim: true,
  		required: 'Title cannot be blank'
  	},
  	start: {
  		type: Date,
  		default: Date.now
  	},
  	end: {
  		type: Date,
  		default: Date.now
  	},
  	description: {
  		type: String,
  		default: '',
  		trim: true
  	}
//  	requirements: [Schema.Types.ObjectId]

  });

  module.exports = mongoose.model('Job', JobSchema);

})();
