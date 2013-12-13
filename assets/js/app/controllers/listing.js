define(['core/BaseController','core/Event'],function(BaseController,Event){
	'use strict';
	
	var ListingController = BaseController.extend({
		uiStates:{
			collapsed:"col-md-10",
			expanded:"col-md-12"
		},
		init:function($scope,AwsService){
			this._super($scope);
			this.$scope.uiState = this.uiStates.expanded;
		},
		defineListeners:function(){
			this._super();
			Event.listen('aws.data',this.onAwsData.bind(this),this);
			Event.listen('cart.clicked',this.onCartClicked.bind(this),this);
		},
		onAwsData:function(name,context,data){
			this.$scope.products = data;
		},
		onCartClicked:function(){
			this.toggleCollapse();
		},
		toggleCollapse:function(){
			if(this.$scope.uiState == this.uiStates.expanded){
				this.$scope.uiState = this.uiStates.collapsed;
			}else{
				this.$scope.uiState = this.uiStates.expanded;
			}
		}
	});

	return ListingController;
});