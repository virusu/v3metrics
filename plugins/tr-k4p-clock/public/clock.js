
// public parts of the plugin (i.e. parts that reside in the public folder and will be transfered to the client)
// must be AMD modules (RequireJS)
define(function(require) {

	// Include our custom CSS (LESS also works)
	require('plugins/tr-k4p-clock/clock.css');

	//checking a random external module, to see if it works #TODO: delete
	//note: lodash module behaves 'good'; it exports objects, so it is easy to import and use
	var lodash = require('lodash');
	var output = lodash.without([1, 2, 3], 1);
	console.log(output);

	//import and use three
	//note: three node module doesn't behave 'good';
	THREE = require("three");
	console.log(THREE.REVISION);

	require("d3");
	require("plugins/tr-k4p-clock/FontUtils");
	require("plugins/tr-k4p-clock/TextGeometry");
	require("plugins/tr-k4p-clock/Projector");
	THREEx = require("plugins/tr-k4p-clock/threex.domevents");
	Detector = require("plugins/tr-k4p-clock/Detector");
	Stats = require("plugins/tr-k4p-clock/Stats");
	require("plugins/tr-k4p-clock/OrbitControls");
	require("plugins/tr-k4p-clock/THREEx.WindowResize");
	require("plugins/tr-k4p-clock/THREEx.FullScreen");
	require("plugins/tr-k4p-clock/DAT.GUI.min");
	require("plugins/tr-k4p-clock/3dc");

	// Create an Angular module for this plugin
	var module = require('ui/modules').get('tr-k4p-clock');
	// Add a controller to this module
	module.controller('ClockController', function($scope, $timeout) {

		var setTime = function() {
			$scope.time = Date.now();
			$timeout(setTime, 1000);
		};
		setTime();

	});

	module.controller('ThreeDCController', function($scope){


//////////
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;

//JSON data saved here
var json_data;

//CROSSFILTER VARS

 var cf;

 var dimByMonth;

 var groupByMonth;

  var dimByOrg;

  var groupByOrg;

// initialization
  //getJSON call, draw meshes with data
   $.getJSON("scm-commits.json", function(data) {
      json_data=data;
      init();
      // animation loop / game loop
      animate();
   });

///////////////
// FUNCTIONS //
///////////////

function init () {

   ///////////
   // SCENE //
   ///////////
   scene = new THREE.Scene();

   ////////////
   // CAMERA //
   ////////////
   // set the view size in pixels (custom or according to window size)
   var SCREEN_WIDTH = window.innerWidth;
   var SCREEN_HEIGHT = window.innerHeight;
   // camera attributes
   var VIEW_ANGLE = 45;
   var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
   var NEAR = 0.1;
   var FAR = 20000;
      // set up camera
   camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
   // add the camera to the scene
   scene.add(camera);
   // the camera defaults to position (0,0,0)
   //    so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
   camera.position.set(0,150,400);
   camera.lookAt(scene.position);

   //////////////
   // RENDERER //
   //////////////
   renderer = new THREE.WebGLRenderer( {antialias:true} );
   renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
   renderer.setClearColor( 0xd8d8d8 );

   // attach div element to variable to contain the renderer
   container = document.getElementById( 'ThreeJS' );
   // attach renderer to the container div
   container.appendChild( renderer.domElement );

    ////////////
  // EVENTS //
  ////////////



  // automatically resize renderer
  THREEx.WindowResize(renderer, camera);
    // toggle full-screen on given key press
  THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

   //////////////
   // CONTROLS //
   //////////////

   // move mouse and: left   click to rotate,
   //                 middle click to zoom,
   //                 right  click to pan
   controls = new THREE.OrbitControls( camera, renderer.domElement );

   ///////////
   // LIGHT //
   ///////////
   var light = new THREE.PointLight(0xffffff,0.8);
   light.position.set(0,200,250);
   scene.add(light);
   var ambientLight = new THREE.AmbientLight(0x111111);
   // scene.add(ambientLight);

   // create a set of coordinate axes to help orient user
   //    specify length in pixels in each direction
   var axes = new THREE.AxisHelper(1000);
   scene.add(axes);

  //STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );

   //////////////
   // CUSTOM //
   //////////////

   // most objects displayed are a "mesh":
   //  a collection of points ("geometry") and
   //  a set of surface parameters ("material")

  var parsed_data=[];

  // Crossfilter and dc.js format
  json_data.values.forEach(function (value) {
    var record = {}
    json_data.names.forEach(function (name, index) {
        if (name == "date") {
          var date = new Date(value[index]*1000);
          record[name] = date;
          record.month = new Date(date.getFullYear(), date.getMonth(), 1);
          record.hour = date.getUTCHours();
        } else {
          record[name] = value[index];
        }
    });
    parsed_data.push(record);
  });

  cf=crossfilter(parsed_data);
  console.log(parsed_data);

  //create a dimension by month

  dimByMonth= cf.dimension(function(p) {return p.month;});

  groupByMonth= dimByMonth.group();

  //create a dimension by org

  dimByOrg= cf.dimension(function(p) {return p.org;});

  groupByOrg= dimByOrg.group();


  //create a dimension by author

  dimByAuthor= cf.dimension(function(p) {return p.author;});

  groupByAuthor= dimByAuthor.group();

 //CUSTOM DASHBOARD//

  THREEDC.initializer(camera,scene,renderer);

/*
  var panel2=THREEDC.addPanel([0,0,0],4);

  var bars =  THREEDC.barsChart(panel2);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .width(200)
      .height(200)
      .numberOfXLabels(7)
      .gridsOn()
      .numberOfYLabels(4)
      .color(0xff8000);

    var line =  THREEDC.lineChart(panel2);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(200)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0x0000ff);

    var line =  THREEDC.smoothCurveChart(panel2);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .gridsOn()
      .width(200)
      .height(200)
      .color('violet');

  var bars =  THREEDC.pieChart(panel2);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .radius(100)
      .color(0xff0000);


  var panel3=THREEDC.addPanel([200,0,200],4);

   var bars =  THREEDC.pieChart(panel3);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .radius(100)
      .color(0xffff00);

     var line =  THREEDC.lineChart(panel3);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(200)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0x00ffff);


        var line =  THREEDC.barsChart(panel3);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(500)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0xff0000);

*/


  var panel2=THREEDC.addPanel([0,0,0],4);

  var bars =  THREEDC.barsChart(panel2);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .width(200)
      .height(200)
      .numberOfXLabels(7)
      .gridsOn()
      .numberOfYLabels(4)
      .color(0xff8000);

    var line =  THREEDC.lineChart(panel2);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(200)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0x0000ff);



    var line =  THREEDC.smoothCurveChart(panel2);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .gridsOn()
      .width(200)
      .height(200)
      .color('violet');

  var bars =  THREEDC.pieChart(panel2);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .radius(100)
      .color(0xff0000);


  var panel3=THREEDC.addPanel([200,0,200],4);

   var bars =  THREEDC.pieChart(panel3);
  bars.group(groupByOrg)
      .dimension(dimByOrg)
      .radius(100)
      .color(0xffff00);

     var line =  THREEDC.lineChart(panel3);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(200)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0x00ffff);


       	var line =  THREEDC.barsChart(panel3);
       line.group(groupByMonth)
      .dimension(dimByMonth)
      .width(500)
      .numberOfXLabels(50)
      .numberOfYLabels(5)
      .gridsOn()
      .height(200)
      .color(0xff0000);


  THREEDC.renderAll();

}

function animate()
{
   requestAnimationFrame( animate );
   render();
   update();
}

function render()
{
   renderer.render( scene, camera );
}

function update()
{
  controls.update();
  stats.update();
}


	});

	module.controller('3DCubeController', function($scope){


    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

    }

    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
    
	});
	// The provider function must return the visualization
	function ClockProvider(Private) {
		// Load TemplateVisType
		var TemplateVisType = Private(require('ui/template_vis_type/template_vis_type'));

		// Return a new instance describing this visualization
		return new TemplateVisType({
			name: 'trClock', // the internal id of the visualization
			title: 'Hola Mundo Clock', // the name shown in the visualize list
			icon: 'fa-clock-o', // the class of the font awesome icon for this
			description: 'Hola Mundo con el reloj digital de Tim Roes', // description shown to the user
			requiresSearch: false, // Cannot be linked to a search
			template: require('plugins/tr-k4p-clock/clock.html'), // Load the template of the visualization
			params: {
				editor: require('plugins/tr-k4p-clock/clock-editor.html'), // Use this HTML as an options editor for this vis
				defaults: { // Set default values for paramters (that can be configured in the editor)
					format: 'HH:mm:ss'
				}
			}
		});
	}

	// Register the above provider to the visualization registry
	require('ui/registry/vis_types').register(ClockProvider);

	// Return the provider, so you potentially load it with RequireJS.
	// This isn't mandatory, but since all Kibana plugins do this, you might
	// want to also return the provider.
	return ClockProvider;

});