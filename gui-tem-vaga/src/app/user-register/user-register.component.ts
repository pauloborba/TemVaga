import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerFormModel: FormGroup;

  @Output() finishRegister = new EventEmitter<{}>();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.registerFormModel = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      name: ['', [Validators.required]],
      photo: '',
      telephone: '',
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmitUser(userData) {
    this.createUser(userData);
    this.registerFormModel.reset();
    this.finishRegister.emit();
  }

  createUser(userData): void {
    this.userService.create(userData).subscribe(
      (user) => {
        if (user) {
          this.userService.login(user);
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }
}
