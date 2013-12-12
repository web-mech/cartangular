requirejs.config({
	baseUrl:'./assets/js/lib/',
	paths:{
		'jquery':'jquery/jquery.min',
		'angular':'angular/angular',
		'jquery':'jquery/jquery.min',
		'angularRoute': 'angular-route/angular-route',
        'angularMocks': 'angular-mocks/angular-mocks',
        'bootstrap':'bootstrap/dist/js/bootstrap',
        'text': 'requirejs-text/text',
        'sprintf':'sprintf/src/sprintf',
        "lodash":"lodash/dist/lodash.min",
		'models':'../app/models',
		'app':'../app',
		'core':'../core',
		'services':'../app/services'
	},
	shim:{
		'angular' : {
			'exports' : 'angular'
		},
		'angularRoute': ['angular'],
        'angularMocks': {
        	'deps':['angular'],
        	'exports':'angular.mock'
        },
        'bootstrap':['jquery']
	},
	priority: ["angular"]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require(['app/bootstrap']);
