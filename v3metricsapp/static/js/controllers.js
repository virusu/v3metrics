angular.module('dashboardApp.controllers', []).

/* Ncommits controller */
controller('ncommitsController', function ($scope, vserverAPIservice) {
	$scope.ncommits = 0;

  vserverAPIservice.getNCommits().success(function (response) {
    $scope.ncommits = response.ncommits;
  });
}).

/* timeseriesController */
controller('timeseriesController', function ($scope, vserverAPIservice) {

  vserverAPIservice.getTimeSeries().success(function (response){
	$scope.timeseries = response.values;
  timeseries = response.values;

  g = new Dygraph(
  document.getElementById("demodiv"),
  function() {
  r = "date,ncommits\n";
  for (var i=0; i<timeseries.length; i++) {
    r += timeseries[i][0] + "," + timeseries[i][1] + "\n";
    }
  r = r.replace(/T00:00:00/g, "");
  console.log(r)
  return r;

  },
  {
    strokeWidth: 2,
    'ncommits': {
      strokeWidth: 0.0,
      drawPoints: true,
      pointSize: 6,
      highlightCircleSize: 6
    },
  }
  );
      /*
      // Dygraphs working model code
      var zp = function(x) { if (x < 10) return "0"+x; else return x; };
      var r = "date,parabola\n";
      for (var i=1; i<=31; i++) {
      r += "200610" + zp(i);
      r += "," + 10*(i*(31-i));
      r += "\n";

      }
      return r;
      */

    }

);
  
});