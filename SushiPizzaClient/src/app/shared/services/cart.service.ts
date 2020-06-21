import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product.model';
import { PathLocationStrategy } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products: ProductInCart[];
  public productIds: number[];
  public totalSum: number;
  public itemsCountObs: BehaviorSubject<number>;

  constructor() {
    this.products = [];
    this.productIds = [];
    this.itemsCountObs = new BehaviorSubject<number>(this.totalSum);
    if (localStorage.getItem('productsIds') === null) {
      localStorage.setItem('productsIds', JSON.stringify(this.productIds));
    }
    else {
      this.productIds = JSON.parse(localStorage.getItem('productsIds'));
      this.setCount();
    }
    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    else {
      this.products = JSON.parse(localStorage.getItem('products'));
    }
    this.calcTotal();

  }

  public getImgPath = (product: Product) => {
    return `http://localhost:5000/${product.imgPath}`;
  }

  private setCount = () => {
    this.itemsCountObs.next(this.productIds.length);
  }

  private addToCart = (product: Product) => {
    this.productIds.push(product.id);
    const productExistInCart = this.products.find(
      (p) => p.id === product.id
    );
    if (!productExistInCart) {
      this.products.push({...product, count: 1});
      this.setCount();
    }
    else {
      productExistInCart.count++;
    }
  }

  private decreaseCount = (product: Product) => {
    const productInCart = this.products.find(p => p.id === product.id);
    if (productInCart.count > 1) {
      productInCart.count--;
      this.productIds.splice(this.productIds.lastIndexOf(product.id), 1);
    }
    else {
      this.productIds.splice(this.productIds.lastIndexOf(product.id), 1);
      this.removeFromCart(productInCart);
    }
  }

  private removeFromCart = (product: Product) => {
    this.products = this.products.filter(p => p.id !== product.id);
    console.log(this.productIds);

  }

  calcTotal = () => {
    this.totalSum = this.products.reduce((sum, prod) => sum += ( prod.price * prod.count), 0);
  }

  makeAction = (type: Actions, product: Product) => {
    if (type === Actions.add) {
      this.addToCart(product);
    }
    else if (type === Actions.remove) {
      this.decreaseCount(product);
    }

    this.calcTotal();
    this.setCount();
    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem('productsIds', JSON.stringify(this.productIds));
  }
}

interface ProductInCart extends Product {
  count: number;
}

export enum Actions {
  'add',
  'remove'
}
