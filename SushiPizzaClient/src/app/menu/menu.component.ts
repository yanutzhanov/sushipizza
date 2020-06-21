import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { NgModel, NgControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public isAuthorize: boolean;
  public itemsCount: number;
  public searchText: string;

  constructor(private cart: CartService, private auth: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    this.cart.itemsCountObs.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthorize = false;
    if (sessionStorage.getItem('token')) {
      this.isAuthorize = true;
    }
    this.cart.itemsCountObs.subscribe(
      (res) =>
      {
        this.itemsCount = res;
        console.log(res);
      }
    , err => console.log(err));

    this.auth.isAuthorizedObs.subscribe(
      res => this.isAuthorize = res,
      err => console.error(err)
    );
  }

  signOut = () => {
    this.auth.signOut();
  }

  calculate = () => {
    this.cart.calcTotal();
  }

  showRegister = () => {
    console.log('Workkk');
    document.querySelector('.modal').classList.remove('.hidden');
  }

  search = () => {
    if (this.searchText) {
      this.router.navigate([`/product-list/${this.searchText}`]);
    }
  }
}
