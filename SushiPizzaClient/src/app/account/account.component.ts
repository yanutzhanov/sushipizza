import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../interfaces/user.model';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  public user: User;
  public isAuth: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.auth.isAuthorizedObs.subscribe(
      res => {
        this.isAuth = res;
        if (res) {
          this.user = { ...this.auth.user };
        }
      },
      err => console.error(err)
    );
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/signin']);
    }
  }

}
