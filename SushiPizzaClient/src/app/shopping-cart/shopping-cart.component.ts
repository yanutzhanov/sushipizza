import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../interfaces/order.model';
import { Product } from '../interfaces/product.model';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public order: Order;
  public orderForm: FormGroup;

  constructor(public cart: ShoppingCartService, private repo: RepositoryService) { }

  ngOnInit(): void {
    this.cart.updateProductMap();
    this.orderForm = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  createOrder = (orderFormValue: any) => {
    console.log(orderFormValue);
    const order: Order = {
      customerPhoneNumber: orderFormValue.phoneNumber,
      address: orderFormValue.address,
      productsIds: this.cart.productIds
    };

    const apiUrl = 'api/orders';
    console.log(order);
    this.repo.create(apiUrl, order, false).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  increaseCount = (product: Product)  => {
    this.cart.increaseCountOfProduct(product);
  }

  decreaseCount = (product: Product) => {
    this.cart.decreaseCountOfProduct(product);
  }
}
