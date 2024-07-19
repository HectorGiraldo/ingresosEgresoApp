import { inject, Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { map, Observable, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;

  initAuthListener() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
      }
    );
    this.isAuthenticated();
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
