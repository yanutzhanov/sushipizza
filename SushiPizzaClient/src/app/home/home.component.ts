import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.model';
import { RepositoryService } from '../shared/services/repository.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[];
  public sushis: Product[];

  constructor(private repo: RepositoryService, private cart: ShoppingCartService) { }

  ngOnInit(): void {
    this.repo.getData('api/products').subscribe(
      res =>  {
        this.products = res as Product[];
        console.log(this.products);
        if (this.products && this.products.length > 3){
          this.sushis = this.products.filter(p => p.type === 'Суши').slice(1, 5);
          console.log(this.sushis);
        }
        else {
          this.sushis = this.products.filter(p => p.type === 'Суши');
          console.log(this.sushis);
        }
      },
      err => console.log(err)
    );
  }

  addProductToShoppingCart = (product: Product) => {
    this.cart.addToCart(product);
  }

}
