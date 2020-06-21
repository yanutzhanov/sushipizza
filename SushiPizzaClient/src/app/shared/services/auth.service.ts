import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepositoryService } from './repository.service';
import { User } from 'src/app/interfaces/user.model';
import { UserForCreation } from 'src/app/interfaces/user-for-creation.model';
import { UserLoginModel } from 'src/app/interfaces/user-login-model.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorizedObs: BehaviorSubject<boolean>;
  public user: User;

  constructor(private repo: RepositoryService, private router: Router) {
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
    this.getToken(apiUrl, user);
  }

  signIn = (user: UserLoginModel) => {
    const apiUrl = 'api/users/login';
    this.getToken(apiUrl, user);
  }

  signOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.setAuth(false);
    this.user = null;
    this.router.navigate(['/signin']);
  }

  private getToken(apiUrl: string, body: UserForCreation | UserLoginModel) {
    this.repo.create(apiUrl, body, false).subscribe(
      res => {
        sessionStorage.setItem('token', (res as RegisterResponse).jwtToken);
        sessionStorage.setItem('role', (res as RegisterResponse).role);
        console.log(res);
        this.getUserInfo();
      },
      err => console.error(err)
    );
  }

  private getUserInfo() {
    this.repo.getData('api/users/account', true).subscribe(
      userInfo => {
        this.user = userInfo as User;
        this.setAuth(true);
        this.router.navigate(['/account']);
      },
      err => console.error(err)
    );
  }
}

interface RegisterResponse {
  jwtToken: string;
  role: string;
}
