(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  /**
   * Address Schema
   */
  var AddressSchema = new Schema({
  	created: {
  		type: Date,
  		default: Date.now
  	},
    city: {
  		type: String,
  		default: '',
  		trim: true
  	},
    city_district: {
  		type: String,
  		default: '',
  		trim: true
  	},
    construction: {
  		type: String,
  		default: '',
  		trim: true
  	},
    continent: {
  		type: String,
  		default: '',
  		trim: true
  	},
    country: {
  		type: String,
  		default: '',
  		trim: true
  	},
    country_code: {
  		type: String,
  		default: '',
  		trim: true
  	},
    road: {
  		type: String,
  		default: '',
  		trim: true
  	},
    house_number: {
  		type: String,
  		default: '',
  		trim: true
  	},
    neighbourhood: {
  		type: String,
  		default: '',
  		trim: true
  	},
    postcode: {
  		type: String,
  		default: '',
  		trim: true
  	},
    public_building: {
  		type: String,
  		default: '',
  		trim: true
  	},
    state: {
  		type: String,
  		default: '',
  		trim: true
  	},
    suburb: {
  		type: String,
  		default: '',
  		trim: true
  	},
    display_name: {
  		type: String,
  		default: '',
  		trim: true
  	},
  	latitude: {
  		type: Number,
  		default: '',
  		trim: true
  	},
  	longitude: {
  		type: Number,
  		default: '',
  		trim: true
  	},
  	description: {
  		type: String,
  		default: '',
  		trim: true
  	}

  });

  module.exports = mongoose.model('Address', AddressSchema);

})();
