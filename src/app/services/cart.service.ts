import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar, private storeService: StoreService) {
    
  }
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("Przedmiot dodano do koszyka", 'Ok', { duration: 3000 });
  }
  getTotal(items: Array<CartItem>): number{
    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0);
  }
  clearCart(update = true): void {
    this.cart.next({ items: [] });
    if(update) this._snackBar.open("Koszyk został opróżniony", "Ok.", { duration: 3000 });
  }
  removeFromCart(item: CartItem, update = true): Array<CartItem> { 
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id);
    if(update)
    {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("Przemiot usunięty z koszyka.", "Ok", { duration: 3000 });
    }
    return filteredItems;
  }
  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map(_item => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
      
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open('Przemiot usunięty z koszyka.', "Ok.", { duration: 3000 });
  }
  
}
