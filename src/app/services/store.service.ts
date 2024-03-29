import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from '../models/cart.model';
//const STORE_BASE_URL = "http://51.20.6.163:3000"; //AWS backend address
const STORE_BASE_URL = "http://localhost:3000"; //localhost testing
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }
  getAllProducts(limit = '0', sort = 'desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/data?sort=${sort}&limit=${limit}${category ? `&category=${category}` : ""} `);
  }
  getCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/api/categories`);;
   }
  checkout(items: Array<CartItem>): void{
    this.httpClient.post(`${STORE_BASE_URL}/checkout`, items).subscribe(async (res: any) => {
    let stripe = await loadStripe("pk_test_51NTPikKf4X5RdzeYjjyJrIYnizOflCGc3hsEVSvsMXOLqHDqGChZoqivdtwbijvE2H74nTTAoG9QEItGWkO2XnCN00VcKiRGI4");
    stripe?.redirectToCheckout({
        sessionId: res.id
    })
    });
  }

}

