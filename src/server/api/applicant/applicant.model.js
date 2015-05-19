(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

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
    state: String
//  	created: {
//  		type: Date,
//  		default: Date.now
//  	}
  });

  module.exports = mongoose.model('Applicant', ApplicantSchema);

})();
