import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  @Input() get cart(): Cart{
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current) => prev + current, 0);
    console.log(this.itemsQuantity);
  }
  constructor(private _cartService: CartService){}
  getTotal(items: Array<CartItem>): number{
    return this._cartService.getTotal(items);
  }
  onClearCart() {
    this._cartService.clearCart();
  }
  numberOfItems(): number { 
    if (this.itemsQuantity === 1) return 1;
    else if (this.itemsQuantity > 1 && this.itemsQuantity <= 4) return 2;
    else return 3;
  }
}
