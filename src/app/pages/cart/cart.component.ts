import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html",
  styles: [
  ]
})
export class CartComponent {
  cart: Cart = {
    items: [
      // {
      //   product: 'https://via.placeholder.com/150',
      //   name: "Intel i5 2137gg",
      //   price: 2137,
      //   quantity: 1,
      //   id: 2137,
      // }
    ]
  };
  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];
  constructor(private cartService: CartService, private storeService: StoreService, private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  onCheckout(): void {
    console.log(this.cart.items);
    this.httpClient.post(`http://localhost:3000/checkout`, { items: this.cart.items }).subscribe(async (res: any) => {
      let stripe = await loadStripe("pk_test_51NTPikKf4X5RdzeYjjyJrIYnizOflCGc3hsEVSvsMXOLqHDqGChZoqivdtwbijvE2H74nTTAoG9QEItGWkO2XnCN00VcKiRGI4");
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}
