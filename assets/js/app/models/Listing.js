define(['core/Class','core/Event'],function( Class, Event ){	
	var ListingModel = Class.extend({
		uiStates:{
			collapsed:"col-md-9",
			expanded:"col-md-12"
		},
		init:function($scope){
			this.$scope = $scope;
			this.$scope.uiState = this.uiStates.expanded;
			this.defineListeners();
		},
		defineListeners:function(){
			Event.listen('aws.data',this.onAwsData.bind(this),this);
			Event.listen('cart.clicked',this.toggleActive.bind(this),this);
		},
		onAwsData:function(name,context,data){
			this.$scope.products = data;
		},
		toggleActive:function(){
			if(this.$scope.uiState == this.uiStates.expanded){
				this.$scope.uiState = this.uiStates.collapsed;
			}else{
				this.$scope.uiState = this.uiStates.expanded;
			}
		},
		itemSelected:function(item){
			Event.notify('list.item',this,item);
		}

	});

	return ListingModel;
});