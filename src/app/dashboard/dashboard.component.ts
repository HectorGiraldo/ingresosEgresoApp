import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription;
  ingresosSubs!: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.ingresosSubs = this.ingresoEgresoService
          .initIngresoEgresoListener(user!.uid)
          .subscribe((ingresoEgresoFB) => {
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ingresoEgresoFB })
            );
          });
      });
  }
  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
