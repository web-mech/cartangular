define(['core/BaseController','core/Event','models/Listing'],function(BaseController,Event,ListingModel){
	'use strict';
	
	var ListingController = BaseController.extend({
		/**
		 * Constructor
		 */
		init:function($scope,AwsService){
			this._super($scope);
			this.model = new ListingModel($scope);
			this.$scope.itemClicked = this.itemClicked.bind(this);
		},
		/**
		 * Event handler for when a product is selected.
		 */ 
		itemClicked:function(item){
			this.model.itemSelected(item);
		}
	});

	return ListingController;
});
