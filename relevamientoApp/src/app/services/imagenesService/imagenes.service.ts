import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { FirestoreService } from '../firestoreService/firestore.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadString } from "firebase/storage";
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(public authService : AuthService, private storage : AngularFireStorage, private firestore : FirestoreService) { }

  public async addNewToGallery(foto : any, tema : number) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true
    });

    let storage = getStorage();
    let date = new Date().getTime();
    let nombre = `${this.authService.actualEmail} ${date}`;

    let fecha = new Date();

    let fechaFinal = String(fecha.getDate()).padStart(2, '0') + '/' + String(fecha.getMonth() + 1).padStart(2, '0') + '/' + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    
    foto.hora = fechaFinal;
    let storageRef = ref(storage, nombre);

    let url = this.storage.ref(nombre);


    uploadString(storageRef,capturedPhoto.dataUrl, 'data_url').then(()=>{
      url.getDownloadURL().subscribe((url1 : any)=>{
        foto.pathFoto = url1;
        this.firestore.agregarFoto(foto,tema);
      })
    });
    
  }
}
