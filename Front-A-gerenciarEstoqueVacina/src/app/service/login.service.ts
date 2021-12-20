import { Injectable } from '@angular/core';
import {Usuario} from "../model/usuario.model";
import {Observable} from "rxjs";
import {first} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;
  private idUsuario: number = 0;
  private usuarioLogado: Usuario = { id:0, nome:'', cpf:'', matricula:'', senha:'', isAdmin:false }

  baseUrl = "https://gerenciarvacina.herokuapp.com/login"


  constructor(private snackBar: MatSnackBar ,private http: HttpClient, private router: Router) { }


  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"center",
      verticalPosition:"top"})
  }

  fazerLogin(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  async verificaLogin(): Promise<boolean> {
    const userStorage = localStorage.getItem("usuarioLogado");
    if(userStorage !== null && this.getUsuarioLogado().id === 0) {
      const usuarioLogado = await this.fazerLogin( <Usuario> JSON.parse(userStorage) ).pipe(first()).toPromise();
      if(Object.values(usuarioLogado).filter(i => i !== null).length > 0) {
        if (usuarioLogado.isAdmin)
          this.autenticaUsuarioLogado(true, usuarioLogado, usuarioLogado.id);
        else if (!usuarioLogado.isAdmin)
          this.autenticaUsuarioLogado(false, usuarioLogado, usuarioLogado.id);

        this.verificaLoginTimeout();
        return true;
      } else {
        localStorage.removeItem("usuarioLogado");
        return this.getUsuarioLogado().id !== 0;
      }
    } else {
      this.verificaLoginTimeout();
      return true;
    }
  }

  verificaLoginTimeout(): void {
    if(this.getUsuarioLogado().id === 0)
      this.router.navigate(['']);

    const interval = setInterval(() => {
      if(this.getUsuarioLogado().id === 0) {
        clearInterval(interval);
        this.router.navigate(['']);
      }
    }, 500);
  }

  autenticaUsuarioLogado(statusAdmin: boolean, usuario:Usuario, idUsuario: number | undefined):void {
    if(idUsuario != undefined){
      this.idUsuario = idUsuario;
    }
    this.usuarioAutenticado = statusAdmin;
    this.usuarioLogado = usuario;
  }

  logout(): void {
    this.usuarioLogado = { id:0, nome:'', cpf:'', matricula:'', senha:'', isAdmin:false };
    this.usuarioAutenticado = false;
    localStorage.removeItem("usuarioLogado");
  }

  getStatus():boolean{
    return this.usuarioAutenticado;
  }

  getUsuarioLogado():Usuario{
    return  this.usuarioLogado;
  }

  getIdUsuarioLogado():number{
    return this.idUsuario;
  }


}

