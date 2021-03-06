import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService{

  baseUrl = "https://gerenciarvacina.herokuapp.com/usuario"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }

  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:3000,
                                              horizontalPosition:"right",
                                              verticalPosition:"top"})
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, usuario)
  }

  read():Observable<Usuario[]>{
    const url = `${this.baseUrl}s`
    return this.http.get<Usuario[]>(url)
  }

  readById(id:string | null):Observable<Usuario>{
    const url = `${this.baseUrl}/${id}}`
    return this.http.get<Usuario>(url)
  }

}
