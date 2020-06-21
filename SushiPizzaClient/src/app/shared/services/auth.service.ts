import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorizedObs: BehaviorSubject<boolean>;
  public user: User;

  constructor(private repo: RepositoryService) {
    this.isAuthorizedObs = new BehaviorSubject<boolean>(false);
    if (sessionStorage.getItem('token')) {
      this.repo.getData('api/users/account', true).subscribe(
        res => {
          this.user = res as User;
          this.setAuth(true);
          console.log(this.user);
        },
        err => console.error(err)
      );
    }
  }

  setAuth(isAuth: boolean) {
    this.isAuthorizedObs.next(isAuth);
  }

  signUp = (user: UserForCreation) => {
    const apiUrl = 'api/users/register';
    this.repo.create(apiUrl, user, false).subscribe(
      res => {
        sessionStorage.setItem('token', (res as RegisterResponse).jwtToken);
        sessionStorage.setItem('role', (res as RegisterResponse).role);
        console.log(res);
        this.repo.getData('api/users/account', true).subscribe(
          userInfo => {
            this.user = userInfo as User;
            this.setAuth(true);
          },
          err => console.error(err)
        );
      },
      err => console.error(err)
    );
  }

  signIn = (user: UserLoginModel) => {
    const apiUrl = 'api/users/login';
    this.repo.create(apiUrl, user, false).subscribe(
      res => {
        sessionStorage.setItem('token', (res as RegisterResponse).jwtToken);
        sessionStorage.setItem('role', (res as RegisterResponse).role);
        console.log(res);
        this.repo.getData('api/users/account', true).subscribe(
          userInfo => {
            this.user = userInfo as User;
            this.setAuth(true);
          },
          err => console.error(err)
        );
      },
      err => console.error(err)
    );
  }

  signOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.setAuth(false);
    this.user = null;
  }
}

export interface UserForCreation {
  fullName: string;
  phoneNumber: string;
  address: string;
  password: string;
  passwordConfirm: string;
}

export interface UserLoginModel {
  phoneNumber: string;
  password: string;
}

export interface RegisterResponse {
  jwtToken: string;
  role: string;
}

interface User {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
}
