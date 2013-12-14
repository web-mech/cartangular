define(['angular','core/Class','core/Event','lodash','sprintf'],function(angular,Class,Event,_){
	'use strict';
	
	var AwsService = angular.module('app.AwsService',[]);
	
	var AwsServiceClass = Class.extend({
		http:false,
		keywords:[],
		searchIndex:'',
		endpoint:'',
		config:'config.json', //config file for service settings.
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
		/**
		 * Load the configuration from config.json
		 */
		loadConfig:function(){
			this.$http.get(this.config).success(function(data){
				this.keywords = data.defaultFilter.split(" "); //keywords to search for
				this.searchIndex = data.defaultIndex; //the index in which to search for
				this.endpoint = data.awsEndpoint; //the endpoint for the aws service

				Event.notify('aws.update',this,data); //notify subscribers that the aws service has been configured

				this.loadData();
			}.bind(this));
		},
		/**
		 * Load data from the aws service.
		 */
		loadData:function(){
			var endpoint = sprintf( this.endpoint, this.keywords.join(','), this.searchIndex );
			this.$http.get(endpoint)
				.success(this.successCallback.bind(this))
				.error(this.errorCallback.bind(this));
		},
		/**
		 * On Success Even.t.
		 */
		successCallback:function(data){
			this.parseAwsResponse(JSON.parse(data.content));
		},
		/**
		 * Parse the aws response and prepare for consumption
		 */
		parseAwsResponse:function(data){
			console.log(data)
			var items = _.filter(data.children, function(child) { return child.name == 'Items'; })[0];
				items = _.filter(items.children, function(item){ return item.name == 'Item'});
				items = _.pluck(items,'children');
				items = _.map(items,this.parseAWSItem.bind(this));
				items = _.filter(items,function(item){ return item.price !== false});

			Event.notify('aws.data',this,items);
		},
		/**
		 * Parse an idividual item's attributes, price and image
		 */
		parseAWSItem:function(item){
			return {
				attrs: this.parseAWSAttrs(item),
				price: this.parseAWSPrice(item),
				thumbnail: this.parseAWSImage(item)
			}
		},
		/**
		 * Parse an item's attributes
		 */
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
		/**
		 * Parse an item's price.
		 */
		parseAWSPrice:function(item){
			//offer summary nodes
			var price = _.filter(item,function(i){ return i.name == 'OfferSummary'});
				price = _.pluck(price,'children')[0];

			return price && price[0] && price[0].children[2] ? price[0].children[2].children[0].text : false;
		},
		/**
		 * Parse an item's image.
		 */
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