//server API
angular.module('dashboardApp.services', []).
	factory('vserverAPIservice', function($http) {

		var vserverAPI = {};

		vserverAPI.getNCommits = function() {
			return $http({
				url: '/ncommits'
			});
		}

		vserverAPI.getTimeSeries = function() {
			return $http({
				url: '/timeseries'
			});
		}

		return vserverAPI;
	});