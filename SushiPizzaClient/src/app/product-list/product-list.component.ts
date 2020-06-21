import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.model';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CartService, Actions } from '../shared/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public allProducts: Product[];
  public type?: string;
  public currentProducts: Product[];

  constructor(private data: DataService, private activeRoute: ActivatedRoute, private cart: CartService) { }

  ngOnInit(): void {
    this.data.dataObs.subscribe(
      res => {
        this.allProducts = res;
        this.activeRoute.params.subscribe(par => {
          this.convertType(par.type);
          this.currentProducts = this.allProducts.filter(p => p.type === this.type);
          console.log(this.type);
        });
      }
    );
  }

  convertType = (type: string) => {
    switch (type) {
      case 'drinks':
        this.type = 'Напиток';
        break;
      case 'rolls':
        this.type = 'Суши';
        break;
      case 'sets':
        this.type = 'Сет';
        break;
      case 'pizzas':
        this.type = 'Пицца';
        break;
      case 'salads':
        this.type = 'Салат';
        break;
      default:
        this.type = '';
        break;
    }
  }

  addToCart = (product: Product) => {
    this.cart.makeAction(Actions.add, product);
  }

}
