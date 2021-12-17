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
  private idUsuario: number = 0;

  usuarioLogado: Usuario = {
    id:0,
    nome:'',
    cpf:'',
    matricula:'',
    senha:'',
    isAdmin:false,
  }

  baseUrl = "http://localhost:8080/login"


  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }


  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"center",
      verticalPosition:"top"})
  }

  fazerLogin(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  autenticaUsuarioLogado(stausAdmin: boolean, usuario:Usuario, idUsuario: number | undefined):void{
    if(idUsuario != undefined){
      this.idUsuario = idUsuario;
    }
    this.usuarioAutenticado = stausAdmin;
    this.usuarioLogado = usuario;
}

  getStatus():Boolean{
    return this.usuarioAutenticado;
  }

  getUsuarioLogado():Usuario{
    console.log(this.usuarioLogado)
    return  this.usuarioLogado;
  }

  getIdUsuarioLogado():number{
    return this.idUsuario;
  }


}

