define(['jquery','core/BaseController','core/Event','models/Cart'],function($,BaseController,Event,Cart){
	
	
	var CartController = BaseController.extend({
		init:function($scope){
			this._super($scope);
			this.model = new Cart(this.$scope);
			this.$scope.cartClick = this.onCartBtnClick.bind(this);
			this.$scope.removeItem = this.removeItem.bind(this);
		},
		removeItem:function(item){
			this.model.remove(item);
		},
		onCartBtnClick:function(){
			this.model.toggleActive();
		}
	});

	return CartController;
});