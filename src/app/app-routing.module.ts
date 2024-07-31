import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { AuthLoadGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    canLoad: [AuthLoadGuard],
    loadChildren: () =>
      import('./ingreso-egreso/ingreso-egreso.module').then(
        (m) => IngresoEgresoModule
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
