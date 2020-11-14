import { BrowserModule } from '@angular/platform-browser';
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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CarService } from '../services/car.service';
import { RideService } from '../services/ride.service';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UserService, CarService, RideService],
  bootstrap: [AppComponent],
})
export class AppModule {}
