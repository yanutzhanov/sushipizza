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
  public search = false;

  constructor(private data: DataService, private activeRoute: ActivatedRoute, private cart: CartService) { }

  ngOnInit(): void {
    this.data.dataObs.subscribe(
      res => {
        this.allProducts = res;
        this.activeRoute.params.subscribe(par => {
          this.convertType(par.type);
          if (!this.search) {
            this.currentProducts = this.allProducts.filter(p => p.type === this.type);
          }
          else {
            this.currentProducts = this.allProducts.filter(p => p.name.toLowerCase().includes(this.type.toLowerCase()));
          }
          console.log(this.search);
          console.log(this.type);
        });
      }
    );
  }

  convertType = (type: string) => {
    switch (type) {
      case 'drinks':
        this.search = false;
        this.type = 'Напиток';
        break;
      case 'rolls':
        this.search = false;
        this.type = 'Суши';
        break;
      case 'sets':
        this.search = false;
        this.type = 'Сет';
        break;
      case 'pizzas':
        this.search = false;
        this.type = 'Пицца';
        break;
      case 'salads':
        this.search = false;
        this.type = 'Салат';
        break;
      default:
        this.search = true;
        this.type = type;
        break;
    }
  }

  addToCart = (product: Product) => {
    this.cart.makeAction(Actions.add, product);
  }

}
