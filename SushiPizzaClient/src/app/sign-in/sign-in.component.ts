import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UserLoginModel } from '../interfaces/user-login-model.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public userForm: FormGroup;
  public mask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    });
  }

  public validateControl = (controlName: string) => {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.userForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  phoneCheck = (userFormValue) => {
    if ((userFormValue.phoneNumber as string).indexOf('_') !== -1) {
      return true;
    }
    return false;
  }

  public loginUser = (userFormValue) => {
    const user: UserLoginModel = {
      phoneNumber: userFormValue.phoneNumber,
      password: userFormValue.password
    };
    this.auth.signIn(user);
  }
}
