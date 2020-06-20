import { Component, OnInit } from '@angular/core';
import { Order } from '../interfaces/order.model';
import { Product } from '../interfaces/product.model';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public order: Order;

  constructor(public cart: ShoppingCartService) { }

  ngOnInit(): void { }

  increaseCount = (product: Product)  => {
    this.cart.increaseCountOfProduct(product);
  }

  decreaseCount = (product: Product) => {
    this.cart.decreaseCountOfProduct(product);
  }
}
