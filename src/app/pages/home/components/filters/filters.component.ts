import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styles: []
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined; //['CPU', 'GPU', 'RAM', 'PSU', 'Cases'];
  categoriesSubscription: Subscription | undefined;
  
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getCategories().subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  onShowCategory(category: string): void {
    console.log(category+" fc.ts");
    this.showCategory.next(category);
   }

}
