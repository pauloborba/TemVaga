import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './navbar.config';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
