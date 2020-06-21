import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../interfaces/order.model';
import { Product } from '../interfaces/product.model';
import { RepositoryService } from '../shared/services/repository.service';
import { CartService, Actions } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public order: Order;
  public orderForm: FormGroup;
  public isAuth = false;
  public phoneNumber: string;
  public address: string;
  public isOrderSuccessful = false;
  public discount = 0;

  constructor(public cart: CartService, private repo: RepositoryService, private auth: AuthService) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
    this.auth.isAuthorizedObs.subscribe(
      res => {
        this.isAuth = res;
        if (res) {
          this.phoneNumber = this.auth.user.phoneNumber;
          this.address = this.auth.user.address;
          this.discount = this.auth.user.discount;
        }
        else {
          this.phoneNumber = '';
          this.address = '';
          this.discount = 0;
        }
      },
      err => console.error(err)
    );
    console.log(this.auth.user);
  }

  createOrder = (orderFormValue: any) => {
    console.log(orderFormValue);
    const order: Order = {
      customerPhoneNumber: orderFormValue.phoneNumber,
      address: orderFormValue.address,
      productsIds: this.cart.productIds,
      totalPrice: this.cart.totalSum * (1 - this.discount / 100)
    };
    if (this.isAuth) {
      order.userId = this.auth.user.id;
    }

    const apiUrl = 'api/orders';
    console.log(order);
    this.repo.create(apiUrl, order, false).subscribe(
      res =>  {
        console.log(res);
        this.isOrderSuccessful = true;
      },
      err => console.log(err)
    );
  }

  increaseCount = (product: Product)  => {
    this.cart.makeAction(Actions.add, product);
  }

  decreaseCount = (product: Product) => {
    this.cart.makeAction(Actions.remove, product);
  }
}
