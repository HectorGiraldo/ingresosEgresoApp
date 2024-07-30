import { inject, Injectable } from '@angular/core';
import { Auth, authState, Unsubscribe } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: Usuario | null;

  get user() {
    return { ...this._user };
  }

  constructor(private store: Store<AppState>) {}

  private auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  authState$ = authState(this.auth);
  userUnsubscribe!: Unsubscribe;

  initAuthListener() {
    authState(this.auth).subscribe(async (fUser) => {
      if (fUser) {
        const userRef = collection(this.firestore, 'user');
        const q = query(userRef, where('uid', '==', fUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          this._user = doc.data();
          this.store.dispatch(auth.setUser({ user: doc.data() }));
        });
      } else {
        this._user = null;
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(auth.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, email);
        const useRef = collection(this.firestore, `user`);
        return addDoc(useRef, { ...newUser });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map((fbUser) => fbUser != null));
  }
}
