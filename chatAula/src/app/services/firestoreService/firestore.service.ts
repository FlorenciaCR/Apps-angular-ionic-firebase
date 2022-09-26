import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  getCollection(coleccion:any){
    return this.firestore.collection(coleccion).valueChanges();
  }

  getCollectionWithId(coleccion:any, nombreIdField:string){
    return this.firestore.collection(coleccion).valueChanges({ idField: nombreIdField });
  }

  addToChat(chat:any,id:number,division:string)
  {
    let idDocument = id.toString();
    this.firestore.collection('Chat'+division).doc(idDocument).set({
        emisor: chat.emisor,
        usuario: chat.usuario,
        texto: chat.texto,
        hora: chat.hora,
    });
  }
}
