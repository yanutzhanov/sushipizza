import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private url: string;

  constructor(private http: HttpClient, private envUrlService: EnvironmentUrlService) {
    this.url = envUrlService.urlAddress;
  }

  public getData = (route: string, auth: boolean = false)  => {
    if (auth) {
      return this.http.get(this.createRoute(route, this.url), this.generateHeadersWithAuth());
    }
    return this.http.get(this.createRoute(route, this.url));
  }

  public create = (route: string, body, auth: boolean) => {
    if (auth) {
      return this.http.post(this.createRoute(route, this.url), this.generateHeadersWithAuth());
    }
    return this.http.post(this.createRoute(route, this.url), body, this.generateHeaders());
  }

  public update = (route: string, body, auth: boolean) => {
    if (auth) {
      return this.http.put(this.createRoute(route, this.url), body, this.generateHeadersWithAuth());
    }
    return this.http.put(this.createRoute(route, this.url), body, this.generateHeaders());
  }

  public delete = (route: string, auth: boolean) => {
    if (auth) {
      return this.http.delete(this.createRoute(route, this.url), this.generateHeadersWithAuth());
    }
    return this.http.delete(this.createRoute(route, this.url));
  }

  private createRoute = (route: string, url: string) => {
    return `${url}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  private generateHeadersWithAuth = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
    };
  }
}
