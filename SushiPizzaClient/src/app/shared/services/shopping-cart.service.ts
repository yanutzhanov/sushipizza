import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public productIds: number[];
  public totalSum: number;
  public products: Product[];
  public itemsCount: number;
  public productMap: Map<Product, number>;
  public itemsCountObs: BehaviorSubject<number>;

  constructor() {
    this.productIds = [];
    this.totalSum = 0;
    this.products = [];
    this.itemsCount = 0;
    this.productMap = new Map<Product, number>();

    if (localStorage.getItem('productsIds') === null) {
      localStorage.setItem('productsIds', JSON.stringify([]));
    }
    else {
      this.productIds = JSON.parse(localStorage.getItem('productsIds'));
      this.itemsCount = this.productIds.length;
    }
    if (localStorage.getItem('totalSum') === null) {
      localStorage.setItem('totalSum', '0');
    }
    else {
      this.totalSum = JSON.parse(localStorage.getItem('totalSum'));
    }
    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', JSON.stringify([]));
    }
    else {
      this.products = JSON.parse(localStorage.getItem('products'));
    }
    this.itemsCountObs  = new BehaviorSubject<number>(this.itemsCount);
    this.updateProductMap();
  }

  setCount(count: number) {
    this.itemsCountObs.next(this.itemsCount);
  }

  addToCart = (product: Product) => {
    this.itemsCount++;
    this.updateProducts(product, true);
    this.updateTotalSum(product, true);
    this.updateProductIds(product, true);
    this.updateProductMap();
    this.setCount(this.itemsCount);
    console.log(`Product added: ${product}`);
  }

  increaseCountOfProduct = (product: Product) => {
    this.itemsCount++;
    this.updateProducts(product, true);
    this.updateTotalSum(product, true);
    this.updateProductIds(product, true);
    this.updateProductMap();
    this.setCount(this.itemsCount);
    console.log(this.productIds);
  }

  decreaseCountOfProduct = (product: Product) => {
    if (this.productMap.get(product) > 0) {
      this.updateProducts(product, false);
      this.updateTotalSum(product, false);
      this.updateProductIds(product, false);
      this.updateProductMap();
      this.itemsCount--;
      this.setCount(this.itemsCount);
      console.log(this.productIds);
    }
  }

  private updateProducts = (product: Product, increase: boolean) => {
    this.products = JSON.parse(localStorage.getItem('products'));
    if (increase) {
      this.products.push(product);
    }
    else {
      for (let i = 0; i < this.products.length; i++) {
        if (JSON.stringify(this.products[i]) === JSON.stringify(product)) {
          this.products.splice(i, 1);
          break;
        }
      }
    }
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private updateTotalSum = (product: Product, increase: boolean) => {
    this.totalSum = Number.parseFloat(localStorage.getItem('totalSum'));
    if (increase) {
      this.totalSum += product.price;
    }
    else {
      this.totalSum -= product.price;
    }
    localStorage.setItem('totalSum', this.totalSum.toString());
  }

  private updateProductIds = (product: Product, increase: boolean) => {
    this.productIds = JSON.parse(localStorage.getItem('productsIds'));
    if (increase) {
      this.productIds.push(product.id);
    }
    else {
      this.productIds.splice(this.productIds.lastIndexOf(product.id), 1);
    }
    localStorage.setItem('productsIds', JSON.stringify(this.productIds));
  }

  updateProductMap = () => {
    this.productMap.clear();
    const productsjson = this.products.map(p => JSON.stringify(p));
    const productsmap: Map<string, number> = new Map();

    productsjson.forEach(p => {
      if (productsmap.has(p)) {
        let count = productsmap.get(p);
        count++;
        productsmap.set(p, count);
      }
      else {
        productsmap.set(p, 1);
      }
    });

    for (const pm of productsmap.entries()) {
      this.productMap.set(JSON.parse(pm[0]), pm[1]);
    }
  }
}
