import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { Product } from 'src/app/interfaces/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private products: Product[];
  public dataObs: BehaviorSubject<Product[]>;

  constructor(repo: RepositoryService) {
    this.dataObs = new BehaviorSubject<Product[]>([]);
    repo.getData('api/products', false).subscribe(
      res =>
      {
        this.products = res as Product[];
        this.setProducts();
        console.log('Data is here baby');
      },
      err => console.error(err)
    );
  }

  private setProducts = () => {
    this.dataObs.next(this.products);
  }

  getProducts = () => {
    return this.products;
  }
}
