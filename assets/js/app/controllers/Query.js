define(['core/BaseController','core/Event'],function(BaseController,Event){
	'use strict';
	
	var QueryController = BaseController.extend({
		timeout:false,
		timeoutInt:500,
		/**
		 * Constructor
		 */
		init:function($scope,AwsService){
			this._super($scope);
			this.service = AwsService;
			this.$scope.filter = '';
			this.$scope.searchIndex = '';
			this.$scope.searchIndices = false;
			this.$scope.onFilterChange = this.onFilterChange.bind(this);
			this.$scope.onIndexChange = this.onIndexChange.bind(this);
			this.defineListeners();
		},
		defineListeners:function(){
			this._super();
			Event.listen('aws.update',this.onAwsUpdate.bind(this));
		},
		/**
		 * Even delegate for when amazon receives it's configuration information. 
		 * This sets the default values in the ui.
		 */
		onAwsUpdate:function(event,context,data){
			this.$scope.searchIndices = data.indices;
			this.$scope.filter = data.defaultFilter
			this.$scope.searchIndex = data.defaultIndex;
		},
		/** 
		 * Event hanlder for selecting a new searchIndex for amazon.
		 */ 
		onIndexChange:function(){
			this.service.setIndex(this.$scope.searchIndex);
			this.service.query();
		},
		/**
		 * Event handler for when the usr types in the search bar.
		 */
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
