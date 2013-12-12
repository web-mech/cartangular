define(['jquery','core/BaseController'],function($,BaseController){
	'use strict';
	
	var CartController = BaseController.extend({
		init:function($scope){
			this._super($scope);
		}
	});

	return CartController;
});