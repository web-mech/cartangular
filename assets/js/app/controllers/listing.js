define(['core/BaseController','core/Event'],function(BaseController,Event){
	'use strict';
	
	var ListingController = BaseController.extend({
		init:function($scope,AwsService){
			this._super($scope);
			Event.listen('aws.data',this.onAwsData.bind(this),this);
		},
		onAwsData:function(name,context,data){
			this.$scope.products = data;
		}
	});

	return ListingController;
});