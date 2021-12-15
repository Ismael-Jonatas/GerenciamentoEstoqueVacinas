import { Injectable } from '@angular/core';
import {Usuario} from "../model/usuario.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;

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
}

  getUsuarioLogado():Boolean{
    return this.usuarioAutenticado;
  }
}

