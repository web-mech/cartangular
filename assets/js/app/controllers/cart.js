define(['jquery','core/BaseController','core/Event','models/Cart'],function($,BaseController,Event,Cart){
	
	
	var CartController = BaseController.extend({
		activeClass:'active',
		init:function($scope){
			this._super($scope);
			this.$scope.active = '';
			this.model = new Cart(this.$scope);
			this.$scope.cartClick = this.onCartBtnClick.bind(this);
			this.$scope.removeItem = this.removeItem.bind(this);
		},
		defineListeners:function(){
			this._super();
			Event.listen('list.item',this.onListItem.bind(this), this);
		},
		onListItem:function(event,context,item){
			this.model.add(item);
		},
		removeItem:function(item){
			this.model.remove(item);
		},
		onCartBtnClick:function(){
			Event.notify('cart.clicked',this,{});
			this.$scope.active = this.$scope.active == '' ? 'active' : '';
		}
	});

	return CartController;
});