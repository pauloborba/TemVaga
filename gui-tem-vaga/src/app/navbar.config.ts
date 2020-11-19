import { Routes } from '@angular/router';
import { MyRidesComponent } from './my-rides/my-rides.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { RequestedRidesComponent } from './requested-rides/requested-rides.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const defaultTitle = 'Caronas Disponíveis';

export const routes: Routes = [
  {
    path: 'available-rides',
    component: AvailableRidesComponent,
    data: { title: 'Caronas Disponíveis' },
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
