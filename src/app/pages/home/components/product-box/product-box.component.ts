import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product-box',
  templateUrl: 'product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input () product: Product | undefined;


  onAddToCart(): void {
    console.log(this.addToCart.emit(this.product));
    

  }
}
