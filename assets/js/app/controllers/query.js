define(['core/BaseController','core/Event'],function(BaseController,Event){
	'use strict';
	
	var QueryController = BaseController.extend({
		init:function($scope,AwsService){
			this._super($scope);
			this.service = AwsService;
			this.$scope.filter = this.service.keywords.join(" ");
			this.$scope.searchIndex = this.service.searchIndex;
			this.$scope.searchIndices = false;
			this.$scope.onFilterChange = this.onFilterChange.bind(this);
			this.$scope.onIndexChange = this.onIndexChange.bind(this);
			Event.listen('aws.indices',this.onAwsIndices.bind(this));
		},
		onAwsIndices:function(event,context,data){
			this.$scope.searchIndices = data;
		},
		onIndexChange:function(){
			this.service.setIndex(this.$scope.searchIndex);
			this.service.query();
		},
		onFilterChange:function(filter){
			this.service.query(filter);
		}
	});

	return QueryController;
});