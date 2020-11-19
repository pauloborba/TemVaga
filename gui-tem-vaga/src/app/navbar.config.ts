import { Routes } from '@angular/router';
import { MyRidesComponent } from './my-rides/my-rides.component';
import { RequestsComponent } from './my-rides/requests/requests.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { RequestedRidesComponent } from './requested-rides/requested-rides.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RequestRideComponent } from './available-rides/request-ride/request-ride.component';

const defaultTitle = 'Caronas Disponíveis';

export const routes: Routes = [
  {
    path: 'available-rides',
    component: AvailableRidesComponent,
    data: { title: 'Caronas Disponíveis' },
  },
  {
    path: 'available-rides/:id',
    component: RequestRideComponent,
    data: { title: 'Pedir Carona' },
  },
  {
    path: 'requested-rides',
    component: RequestedRidesComponent,
    data: { title: 'Caronas Solicitadas' },
  },
  {
    path: 'my-rides',
    component: MyRidesComponent,
    data: { title: 'Minhas Caronas' },
  },
  {
    path: 'my-rides/:id',
    component: RequestsComponent,
    data: { title: 'Pedidos' },
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    data: { title: 'Meu Perfil' },
  },
  {
    path: '',
    redirectTo: '/available-rides',
    pathMatch: 'full',
    data: { title: defaultTitle },
  },
  {
    path: '**',
    redirectTo: '/available-rides',
    pathMatch: 'full',
    data: { title: defaultTitle },
  },
];
