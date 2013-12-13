({
    baseUrl:'./assets/js/lib/',
	paths:{
		'jquery':'jquery/jquery.min',
		'angular':'angular/angular',
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
    //name: "../../../public/production/production",
    name: "../app",
    out: "public/js/app.js"
})