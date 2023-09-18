import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350}
@Component({
  selector: 'app-home',
  templateUrl: "./home.component.html",

})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '9999';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }
  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void{
    if (this.productsSubscription) { 
      this.productsSubscription.unsubscribe();
    }
  }
  getProducts(): void{
    this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => { 
      this.products = _products;
    });
  }
  onColumnsCountChange(colsNumber: number): void { 
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCat: string): void {
    console.log(newCat + "+");
    this.category = newCat;
    this.getProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
  onItemsCountChange(newCount: Number): void {
    this.count = newCount.toString();
    this.getProducts();

  }
  onSortChange(sorttype: string): void {
    this.sort = sorttype;
    this.getProducts();

  }
}
