import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-ride-register',
  templateUrl: './ride-register.component.html',
  styleUrls: ['./ride-register.component.css'],
})
export class RideRegisterComponent implements OnInit {
  registerFormModel: FormGroup;
  isFinished: boolean = false;
  driverCpf: string;
  Places: string[] = ['UFPE', 'Olinda', 'Boa Viagem', 'Derby'];

  @Output() finishRegister = new EventEmitter<{ registeredRideId: string }>();
  @Output() cancelRegister = new EventEmitter<{}>();

  constructor(
    private rideService: RideService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userService.loggedUser.subscribe((user) => {
      if (user) {
        this.driverCpf = user.cpf;
      } else {
        this.driverCpf = '';
      }
    });
    this.registerFormModel = this.formBuilder.group({
      departureTime: '',
      price: '',
      isPrivate: 'No',
      seats: '',
      departurePlace: [''],
      arrivalPlace: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(rideData) {
    rideData.driver = this.driverCpf;
    this.createRide(rideData);
    this.isFinished = true;
    this.registerFormModel.reset();
  }

  onCancelRegister() {
    this.cancelRegister.emit();
  }

  createRide(rideData): void {
    this.rideService.create(rideData).subscribe(
      (ride) => {
        if (ride) {
          this.finishRegister.emit({ registeredRideId: ride.id });
        } else {
          this.finishRegister.emit({ registeredRideId: '' });
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }
}
