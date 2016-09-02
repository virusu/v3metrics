
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
	console.log(THREE.REVISION)

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