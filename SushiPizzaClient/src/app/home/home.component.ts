import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.model';
import { RepositoryService } from '../shared/services/repository.service';
import { CartService, Actions } from '../shared/services/cart.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[];
  public sushis: Product[];
  public pizzas: Product[];
  public sets: Product[];

  constructor(private repo: RepositoryService, private cart: CartService, private data: DataService) { }

  ngOnInit(): void {
    this.data.dataObs.subscribe(res => {
      this.products = res;
      this.sushis = this.products.filter(p => p.type === 'Суши').slice(0, 4);
      this.pizzas = this.products.filter(p => p.type === 'Пицца').slice(0, 4);
      this.sets = this.products.filter(p => p.type === 'Сет').slice(0, 4);
    });
  }

  addProductToShoppingCart = (product: Product) => {
    this.cart.makeAction(Actions.add, product);
  }

}
