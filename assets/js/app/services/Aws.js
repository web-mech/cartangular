define(['angular','core/Class','core/Event','lodash','sprintf'],function(angular,Class,Event,_){
	var AwsService = angular.module('app.AwsService',[]);
	
	var AwsServiceClass = Class.extend({
		http:false,
		keywords:[],
		searchIndex:'',
		endpoint:'',
		config:'assets/config.json',
		init:function($http){
			this.$http = $http;
			this.loadConfig();
		},
		query:function(data){
			if(data)
				this.keywords = data.split(" ");
			this.loadData();
		},
		setIndex:function(data){
			this.searchIndex = data;
		},
		loadConfig:function(){
			this.$http.get(this.config).success(function(data){
				this.keywords = data.defaultFilter.split(" ");
				this.searchIndex = data.defaultIndex;
				this.endpoint = data.awsEndpoint;

				Event.notify('aws.update',this,data);

				this.loadData();
			}.bind(this));
		},
		loadData:function(){
			var endpoint = sprintf( this.endpoint, this.keywords.join(','), this.searchIndex );
			this.$http.get(endpoint)
				.success(this.successCallback.bind(this))
				.error(this.errorCallback.bind(this));
		},
		successCallback:function(data){
			this.parseAwsResponse(JSON.parse(data.content));
		},
		parseAwsResponse:function(data){
			console.log(data)
			var items = _.filter(data.children, function(child) { return child.name == 'Items'; })[0];
				items = _.filter(items.children, function(item){ return item.name == 'Item'});
				items = _.pluck(items,'children');
				items = _.map(items,this.parseAWSItem.bind(this));
			
			Event.notify('aws.data',this,items);
		},
		parseAWSItem:function(item){
			return {
				attrs: this.parseAWSAttrs(item),
				price: this.parseAWSPrice(item),
				thumbnail: this.parseAWSImage(item)
			}
		},
		parseAWSAttrs:function(item){
			var obj = {};
			//attributes nodes
			var attrs = _.filter(item,function(i){ return i.name == 'ItemAttributes'});
				attrs = _.pluck(attrs,'children')[0];

			//map attributes to an object
			for(var i =0; i<attrs.length;i++){
				var nm = attrs[i].name;
				var vl = attrs[i].children[0].text;
				obj[nm]=vl;
			}

			return obj;
		},
		parseAWSPrice:function(item){
			//offer summary nodes
			var price = _.filter(item,function(i){ return i.name == 'OfferSummary'});
				price = _.pluck(price,'children')[0];

			return price && price[0] && price[0].children[2] ? price[0].children[2].children[0].text : false;
		},
		parseAWSImage:function(item){
			//image nodes
			var image = _.filter(item,function(i){return i.name == 'MediumImage'});
				image = _.pluck(image,'children')[0];

			return image && image[0] && image[0].children[0] ? image[0].children[0].text : '';
		},
		errorCallback:function(){
			console.log(arguments);
		}
	});

	AwsService.factory('Aws',function($http){
		return new AwsServiceClass($http);
	});
});