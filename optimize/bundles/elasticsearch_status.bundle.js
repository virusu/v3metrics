webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Test entry file
	 *
	 * This is programatically created and updated, do not modify
	 *
	 * context: {"env":"development","urlBasePath":"/rpf","sourceMaps":true,"kbnVersion":"5.0.0-alpha4","buildNum":8467}
	 * includes code from:
	 *  - console@1.0.0
	 *  - dev_mode@1.0.0
	 *  - elasticsearch@1.0.0
	 *  - elasticsearch_status@0.0.0
	 *  - kbn_doc_views@1.0.0
	 *  - kbn_vislib_vis_types@1.0.0
	 *  - kibana@1.0.0
	 *  - markdown_vis@1.0.0
	 *  - metric_vis@1.0.0
	 *  - spy_modes@1.0.0
	 *  - status_page@1.0.0
	 *  - table_vis@1.0.0
	 *  - tests_bundle@0.0.0
	 *  - timelion@5.0.0-alpha4
	 *  - tr-k4p-clock@0.4.0
	 *
	 */
	
	'use strict';
	
	__webpack_require__(1097);
	__webpack_require__(1999);
	__webpack_require__(1097).bootstrap();
	/* xoxo */

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./base.less": 1184,
		"./callout.less": 1185,
		"./config.less": 1186,
		"./control_group.less": 1187,
		"./dark-theme.less": 1188,
		"./dark-variables.less": 1189,
		"./fonts.less": 1190,
		"./hintbox.less": 1191,
		"./input.less": 1192,
		"./list-group-menu.less": 1193,
		"./navbar.less": 1194,
		"./pagination.less": 1195,
		"./sidebar.less": 1196,
		"./spinner.less": 1197,
		"./table.less": 1198,
		"./theme.less": 1199,
		"./truncate.less": 1200
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 316;


/***/ },

/***/ 1183:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var context = __webpack_require__(316);
	context.keys().forEach(function (key) {
	  return context(key);
	});

/***/ },

/***/ 1184:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1185:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1186:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1187:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1188:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1189:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1190:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1191:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1192:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1193:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1194:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1195:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1196:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1197:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1198:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1199:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1200:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1999:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _uiModules = __webpack_require__(1105);
	
	var _uiModules2 = _interopRequireDefault(_uiModules);
	
	var _uiRoutes = __webpack_require__(1124);
	
	var _uiRoutes2 = _interopRequireDefault(_uiRoutes);
	
	__webpack_require__(1183);
	
	__webpack_require__(2000);
	
	var _templatesIndexHtml = __webpack_require__(2001);
	
	var _templatesIndexHtml2 = _interopRequireDefault(_templatesIndexHtml);
	
	var _templatesDetailHtml = __webpack_require__(2002);
	
	var _templatesDetailHtml2 = _interopRequireDefault(_templatesDetailHtml);
	
	_uiRoutes2['default'].enable();
	_uiRoutes2['default'].when('/', {
	  template: _templatesIndexHtml2['default'],
	  controller: 'elasticsearchStatusController',
	  controllerAs: 'ctrl'
	}).when('/index/:name', {
	  template: _templatesDetailHtml2['default'],
	  controller: 'elasticsearchDetailController',
	  controllerAs: 'ctrl'
	});
	
	_uiModules2['default'].get('app/elasticsearch_status').controller('elasticsearchStatusController', function ($http) {
	  var _this = this;
	
	  $http.get('../api/elasticsearch_status/indices').then(function (response) {
	    _this.indices = response.data;
	  });
	}).controller('elasticsearchDetailController', function ($routeParams, $http) {
	  var _this2 = this;
	
	  this.index = $routeParams.name;
	
	  $http.get('../api/elasticsearch_status/index/' + this.index).then(function (response) {
	    _this2.status = response.data;
	  });
	});

/***/ },

/***/ 2000:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 2001:
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-12-sm\">\n      <h1>Elasticsearch Status</h1>\n      <ul class=\"indexList\">\n        <li ng-repeat=\"index in ctrl.indices\">\n          <a href=\"#/index/{{index}}\">{{ index }}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 2002:
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-12-sm\">\n\t\t\t<a href=\"#/\">Index list</a>\n      <h1>Index: {{ ctrl.index }}</h1>\n\t\t\t<pre>{{ ctrl.status | json }}</pre>\n    </div>\n  </div>\n</div>\n"

/***/ }

});
//# sourceMappingURL=elasticsearch_status.bundle.js.map