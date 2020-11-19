import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MyRidesComponent } from './my-rides/my-rides.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { RequestedRidesComponent } from './requested-rides/requested-rides.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { RequestsComponent } from './my-rides/requests/requests.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CarRegisterComponent } from './car-register/car-register.component';
import { RideRegisterComponent } from './ride-register/ride-register.component';
import { RouteRegisterComponent } from './ride-register/route-register/route-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CarService } from '../services/car.service';
import { RideService } from '../services/ride.service';
import { RideComponent } from './ride/ride.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MyRidesComponent,
    MyProfileComponent,
    AvailableRidesComponent,
    RequestedRidesComponent,
    RideListComponent,
    RequestsComponent,
    UserRegisterComponent,
    CarRegisterComponent,
    RideRegisterComponent,
    RouteRegisterComponent,
    RideComponent,
    UserLoginComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, CarService, RideService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
