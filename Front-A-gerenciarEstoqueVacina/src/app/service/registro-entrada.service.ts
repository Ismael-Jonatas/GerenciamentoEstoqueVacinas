import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistroEntrada} from "../model/registroEntrada";
import {Observable} from "rxjs";
import { ToListagemDeRegistroEntrada } from "../model/ToListagemDeRegistroEntrada";

@Injectable({
  providedIn: 'root'
})
export class RegistroEntradaService {

  baseUrl = "http://localhost:8080/registro-de-entrada"
  baseUrl2 = "http://localhost:8080/registros-de-entradas"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top"})
  }

  create(regristroEntrada: ToListagemDeRegistroEntrada): Observable<RegistroEntrada>{
    return this.http.post<RegistroEntrada>(this.baseUrl, regristroEntrada)
  }

  read():Observable<RegistroEntrada[]>{
    return this.http.get<RegistroEntrada[]>(this.baseUrl2)
  }

  readById(id:string | null):Observable<RegistroEntrada>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<RegistroEntrada>(url)
  }


}
