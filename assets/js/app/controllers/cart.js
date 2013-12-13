define(['jquery','core/BaseController','core/Event'],function($,BaseController,Event){
	
	
	var CartController = BaseController.extend({
		init:function($scope){
			this._super($scope);
			this.$scope.cartClick = this.onCartBtnClick.bind(this);
		},
		onCartBtnClick:function(){
			
			Event.notify('cart.clicked',this,{a:'b'});
		}
	});

	return CartController;
});