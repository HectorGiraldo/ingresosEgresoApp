import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  firestore: Firestore = inject(Firestore);
  users$!: Observable<[]>;
  constructor(private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    console.log(this.authService.user);
    const uid = this.authService.user.uid;
    const collectionIngresoEgreso = collection(
      this.firestore,
      `${uid}/ingresos-egresos/items`
    );
    const documentRef = doc(collectionIngresoEgreso);
    return setDoc(documentRef, { ...ingresoEgreso });
  }

  initIngresoEgresoListener(uid: string) {
    console.log(uid);
    const userProfileCollection = collection(
      this.firestore,
      `${uid}/ingresos-egresos/items`
    );
    this.users$ = collectionData(userProfileCollection, {
      idField: 'uid',
    }) as Observable<[]>;
    this.users$.subscribe((data) => {
      console.log(data);
    });
  }
}
