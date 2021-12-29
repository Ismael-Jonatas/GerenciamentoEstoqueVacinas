import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RegistroEntrada } from "../model/registroEntrada";
import { Observable } from "rxjs";
import { ToListagemDeRegistroEntrada } from "../model/ToListagemDeRegistroEntrada";
import { AbstractRegistroService } from './abstract-registro.service';

@Injectable({
  providedIn: 'root'
})
// Template Method
export class RegistroEntradaService extends AbstractRegistroService {

  baseUrl = "https://gerenciarvacina.herokuapp.com/registro-de-entrada"
  baseUrl2 = "https://gerenciarvacina.herokuapp.com/registros-de-entradas"

  constructor(public snackbar: MatSnackBar, private http: HttpClient) {
    super(snackbar);
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
