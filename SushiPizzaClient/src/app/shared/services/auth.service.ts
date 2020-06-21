import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorizedObs: BehaviorSubject<boolean>;

  constructor(private repo: RepositoryService) {
    this.isAuthorizedObs = new BehaviorSubject<boolean>(false);
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
        this.setAuth(true);
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
        this.setAuth(true);
      },
      err => console.error(err)
    );
  }

  signOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.setAuth(false);
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
