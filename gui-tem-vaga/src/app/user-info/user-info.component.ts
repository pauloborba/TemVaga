import { Component, Input } from '@angular/core';
import User from '../../../../common/src/User/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  @Input() userInfo: User;
}
