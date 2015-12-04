(function () {
    'use strict';

    angular.module('app', [
            // Angular modules
            'ngAnimate',
            'ngRoute'

            // Custom modules

            // 3rd Party Modules
    ])
        .config(function ($locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
        })
        .controller('billingAddress', ['$location', function ($location) {
            var viewModel = this;
            var queryStringParams = $location.search();
            viewModel.address = queryStringParams.address;
            viewModel.policyId = queryStringParams.resource;
            viewModel.legalEntity = queryStringParams.legalEntity;
            viewModel.legalEntityType = 'person';
            viewModel.selectedAddress = viewModel.address;
            viewModel.newBillingAddress = 'select';
            viewModel.accept = function () {
                var result = 
                    viewModel.selectedAddress === viewModel.address ? (viewModel.legalEntityType === 'person' ? 'Registered Address' : 'Primary Address') :
                        'New billing address with Id "F066A2D5-409B-4A96-B614-70D82CB98679"';
                if (window.opener && window.opener.postMessage)
                    window.opener.postMessage(['accept', { presentation: result }], '*');
                else {
                    console.log('Done: ' + result);
                }
            };
            viewModel.selectAnotherBillingAddress = function () { alert('here is where the demo ends'); };
        }]);
})();
