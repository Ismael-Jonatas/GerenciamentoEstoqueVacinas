import { Injectable } from '@angular/core';
import {Usuario} from "../model/usuario.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventEmitter} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  baseUrl = "http://localhost:8080/login"


  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }


  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top"})
  }

  fazerLogin(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  autenticaUsuarioLogado(stausAdmin: boolean):void{
    this.usuarioAutenticado = stausAdmin;
    if(this.usuarioAutenticado == true){
      this.mostrarMenuEmitter.emit(true);
    }else{
      this.mostrarMenuEmitter.emit(false);
    }
}

}
0
