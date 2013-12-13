define(['core/Class'],function( Class ){
	var CartModel = Class.extend({
		init:function($scope){
			this.$scope = $scope;
			this.$scope.list = [];
			this.$scope.total = 0;
			this.$scope.totalFormatted = '0.00';
			Number.prototype.format = function(n, x) {
			    var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
			    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
			};
		},
		indexOf:function(item){
			for(var i =0;i<this.$scope.list.length; i++){
				if(item.$$hashKey == this.$scope.list[i].$$hashKey)
					return i;
			}
			return -1;
		},
		calculateTotal:function(){
			this.$scope.total = 0;

			for(var i =0;i<this.$scope.list.length; i++){
				this.$scope.total += parseFloat(this.$scope.list[i].price.substr(1));
			}

			this.$scope.totalFormatted = this.$scope.total.format(2);
		},
		add:function(item){
			if(this.indexOf(item) < 0){
				this.$scope.list.push(item);
				this.calculateTotal();
			}
		},
		remove:function(item){
			var itemIndex = this.indexOf(item);
			if(itemIndex < 0)
				return false;

			this.$scope.list.splice(itemIndex,1);
			this.calculateTotal();
		}
	});

	return CartModel;
});