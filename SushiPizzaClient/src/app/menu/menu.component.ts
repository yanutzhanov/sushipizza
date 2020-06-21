import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public isAuthorize: boolean;
  public itemsCount: number;

  constructor(private cart: CartService) { }

  ngOnDestroy(): void {
    this.cart.itemsCountObs.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthorize = false;
    if (localStorage.getItem('token')) {
      this.isAuthorize = true;
    }
    this.isAuthorize = true;
    this.cart.itemsCountObs.subscribe(
      (res) =>
      {
        this.itemsCount = res;
        console.log(res);
      }
    , err => console.log(err));
  }

  signOut = () => {
    localStorage.removeItem('token');
  }

  calculate = () => {
    this.cart.calcTotal();
  }

}
