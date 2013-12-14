define(['core/Class','core/Event'],function( Class, Event ){
	'use strict';

	var ListingModel = Class.extend({
		uiStates:{
			collapsed:"col-md-9",
			expanded:"col-md-12"
		},
		/**
		 * Constructor
		 */
		init:function($scope){
			this.$scope = $scope;
			this.$scope.uiState = this.uiStates.expanded;
			this.defineListeners();
		},
		/**
		 * Event Listeners.
		 * 1) Listen for the aws service for returned product data.
		 * 2) Listen to the cart clicked event so the listing ui can respond accordingly.
		 */
		defineListeners:function(){
			Event.listen('aws.data',this.onAwsData.bind(this),this);
			Event.listen('cart.clicked',this.toggleActive.bind(this),this);
		},
		/**
		 * Event delegate for handling amazon item search product data.
		 */
		onAwsData:function(name,context,data){
			this.$scope.products = data;
		},
		/**
		 * Toggle the listing ui active state. 
		 */
		toggleActive:function(){
			if(this.$scope.uiState == this.uiStates.expanded){
				this.$scope.uiState = this.uiStates.collapsed;
			}else{
				this.$scope.uiState = this.uiStates.expanded;
			}
		},
		/**
		 * Event delegate for item selected. This emits an event notifying all listeners of what item was selected. 
		 */
		itemSelected:function(item){
			Event.notify('list.item',this,item);
		}

	});

	return ListingModel;
});