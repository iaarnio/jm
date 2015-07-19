(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose');
  var	Schema = mongoose.Schema;

  /**
   * Applicant Schema
   */
  var ApplicantSchema = new Schema({
    userid: {
      type: String,
      required: true
    },
    jobid: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    state: String
//  	created: {
//  		type: Date,
//  		default: Date.now
//  	}
  });

  module.exports = mongoose.model('Applicant', ApplicantSchema);

})();
