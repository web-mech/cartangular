define(['core/BaseController','core/Event'],function(BaseController,Event){
	'use strict';
	
	var QueryController = BaseController.extend({
		timeout:false,
		timeoutInt:500,
		init:function($scope,AwsService){
			this._super($scope);
			this.service = AwsService;
			this.$scope.filter = '';
			this.$scope.searchIndex = '';
			this.$scope.searchIndices = false;
			this.$scope.onFilterChange = this.onFilterChange.bind(this);
			this.$scope.onIndexChange = this.onIndexChange.bind(this);
			Event.listen('aws.update',this.onAwsUpdate.bind(this));
		},
		onAwsUpdate:function(event,context,data){
			this.$scope.searchIndices = data.indices;
			this.$scope.filter = data.defaultFilter
			this.$scope.searchIndex = data.defaultIndex;
		},
		onIndexChange:function(){
			this.service.setIndex(this.$scope.searchIndex);
			this.service.query();
		},
		onFilterChange:function(filter){
			if(this.timeout)
				clearTimeout(this.timeout);

			this.timeout = setTimeout(this.queryService.bind(this,filter),this.timeoutInt);
		},
		queryService:function(filter){
			this.service.query(filter);
		}
	});

	return QueryController;
});
