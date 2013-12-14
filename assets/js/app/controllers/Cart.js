define(['jquery','core/BaseController','core/Event','models/Cart'],function($,BaseController,Event,Cart){
	'use strict';
	
	var CartController = BaseController.extend({
		/**
		 * Constructor
		 */
		init:function($scope){
			this._super($scope);
			this.model = new Cart(this.$scope);
			this.$scope.cartClick = this.onCartBtnClick.bind(this);
			this.$scope.removeItem = this.removeItem.bind(this);
		},
		/**
		 * Event handler for when an item is removed.
		 */
		removeItem:function(item){
			this.model.remove(item);
		},
		/**
		 * Event handler for toggling the cart ui state.
		 */
		onCartBtnClick:function(){
			this.model.toggleActive();
		}
	});

	return CartController;
});
