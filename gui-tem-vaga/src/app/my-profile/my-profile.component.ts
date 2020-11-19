import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import User from '../../../../common/src/User/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  loginFormModel: FormGroup;
  isRegisteringUser: boolean = false;
  isLoggedIn: boolean;
  loggedUser: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loginFormModel = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((value) => (this.isLoggedIn = value));
    this.userService.loggedUser.subscribe((user) => (this.loggedUser = user));
  }

  onRegister(): void {
    this.isRegisteringUser = true;
  }

  onFinishRegister(): void {
    this.isRegisteringUser = false;
  }

  onSubmitLogin({ email, password }): void {
    this.loginUser(email, password);
    this.loginFormModel.reset();
  }

  loginUser(email: string, password: string): void {
    this.userService.getUserByLogin(email, password).subscribe((user) => {
      if (user) {
        this.userService.login(user);
      }
    });
  }

  logoutUser(): void {
    this.userService.logout();
  }
}
