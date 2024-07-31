import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ingreso-egresoapp-7614b',
        appId: '1:193398023655:web:a2e4d4fb4d4043d03b8942',
        storageBucket: 'ingreso-egresoapp-7614b.appspot.com',
        apiKey: 'AIzaSyCcGgvOFrpwTF0-HYtbFpoea3yxkn-M9_M',
        authDomain: 'ingreso-egresoapp-7614b.firebaseapp.com',
        messagingSenderId: '193398023655',
        measurementId: 'G-PN1DYTE85R',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
