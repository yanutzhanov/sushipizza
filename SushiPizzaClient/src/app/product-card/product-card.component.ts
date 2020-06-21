import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../interfaces/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() public product: Product;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
    if (!this.product) {
      this.product = {
        id: 0,
        imgPath: '/assets/images/calif.png',
        name: 'Калифорния с креветкой',
        composition: 'Состав: Креветка, Авокадо, Огурец,Икра масаго, Нори, Рис ',
        portion: '8 шт',
        price: 1080,
        type: 'Суши'
      };
    }
    if (!this.product.imgPath) {
      this.product.imgPath = '/assets/images/philodelphia.png';
    }
  }

  public emitEvent = (product: Product) => {
    this.onClick.emit(product);
  }

}
