import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from '../shared/services/repository.service';
import { UserForCreation, AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public userForm: FormGroup;
  public mask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
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

  checkConfirm = (userFormValue: any) => {
    if (userFormValue.password !== userFormValue.passwordConfirm &&
       this.userForm.controls.password.touched &&
       this.userForm.controls.passwordConfirm.touched) {
      return true;
    }
    return false;
  }

  registerUser = (userFormValue: any) => {
    if (this.userForm.valid) {
      this.executeUserRegister(userFormValue);
    }
  }

  executeUserRegister = (userFormValue: any) => {
    const userForCreation: UserForCreation = {
      fullName: userFormValue.fullName,
      phoneNumber: userFormValue.phoneNumber,
      address: userFormValue.address,
      password: userFormValue.password,
      passwordConfirm: userFormValue.passwordConfirm
    };
    this.auth.signUp(userForCreation);
  }

}
