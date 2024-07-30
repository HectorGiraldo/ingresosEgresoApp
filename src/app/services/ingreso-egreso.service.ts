import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
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
  constructor(private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    const collectionIngresoEgreso = collection(
      this.firestore,
      `${uid}/ingresos-egresos/items`
    );
    const documentRef = doc(collectionIngresoEgreso);
    delete ingresoEgreso.uid;
    return setDoc(documentRef, { ...ingresoEgreso });
  }

  initIngresoEgresoListener(uid: string) {
    const collectionIngresoEgreso = collection(
      this.firestore,
      `${uid}/ingresos-egresos/items`
    );
    return collectionData(collectionIngresoEgreso, {
      idField: 'uid',
    }) as Observable<[]>;
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    const documentRef = doc(
      this.firestore,
      `${uid}/ingresos-egresos/items/${uidItem}`
    );
    return deleteDoc(documentRef);
  }
}
