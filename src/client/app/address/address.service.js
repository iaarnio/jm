(function () {
  'use strict';

  angular.module('jokumuuApp')
    .factory('addressService', addressService);

  addressService.$inject = ['$http', '$q', 'logger'];

  function addressService($http, $q, logger) {

    return {
      queryDetails: queryDetails,
      showMap: showMap,
      listAddresses: listAddresses,
      viewAddress: viewAddress,
      addAddress: addAddress,
      deleteAddress: deleteAddress,
      applyAddress: applyAddress
    };

    function queryDetails(address) {
    //address.road = 'tehtaankatu+7'
      return $http({
        method: 'GET',
        url: 'https://nominatim.openstreetmap.org/search?q=' + address.road + ',+' + address.city + '&format=json&addressdetails=1&limit=1',
        headers : {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'https://nominatim.openstreetmap.org',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Credentials': true
        }})
        .then(collectAddressDetails)
        .catch(serviceFail);
    }

    function showMap() {

    }

    function applyAddress(address) {

    }
    
    function collectAddressDetails(queryResults) {
      let qRes = queryResults.data[0];
      let addressDetails = qRes.address;
      addressDetails.lat = qRes.lat;
      addressDetails.lon = qRes.lon;
      console.log(addressDetails)
      return addressDetails;
    }
    
    function listAddresses() {
      return $http.get('/api/addresses')
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function viewAddress(addressId) {
      return $http.get('/api/addresses/' + addressId)
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function addAddress(address) {
      console.log('add addr');
      console.log(address);
      return $http.post('/api/addresses', address)
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function deleteAddress(address) {

    }

    function serviceComplete(response) {
      return response.data;
    }

    function serviceFail(message) {
      var errorMsg = 'addressService failed on XHR: ' + message.status + ' ' + message.statusText;
      logger.error(errorMsg);
      return $q.reject(errorMsg);
    }
    
  }

})();
