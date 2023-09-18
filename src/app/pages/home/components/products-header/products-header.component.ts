import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;
  onSortUpdated(newSort: string): void { 
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(newItems: string): void{
    let tempCount : number;
    if (newItems === "Wszystkie")
      tempCount = 99999999999;
    else tempCount = Number(newItems)
    this.itemsShowCount = tempCount;
    this.itemsCountChange.emit(tempCount)
  }
  onColumnsUpdated(colsNum: number): void{
    this.columnsCountChange.emit(colsNum);
  }

}