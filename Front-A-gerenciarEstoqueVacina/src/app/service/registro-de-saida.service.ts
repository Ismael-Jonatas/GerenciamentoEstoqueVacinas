import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RegistroSaida } from "../model/registroSaida";
import { Observable } from "rxjs";
import { AbstractRegistroService } from './abstract-registro.service';

@Injectable({
  providedIn: 'root'
})
// Template Method
export class RegistroDeSaidaService extends AbstractRegistroService {

  baseUrl = "https://gerenciarvacina.herokuapp.com/registro-de-saida"
  baseUrl2 = "https://gerenciarvacina.herokuapp.com/registros-de-saidas"

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {
    super(snackBar);
  }

  create(regristroSaida: RegistroSaida): Observable<RegistroSaida>{
    return this.http.post<RegistroSaida>(this.baseUrl, regristroSaida)
  }

  read():Observable<RegistroSaida[]>{
    return this.http.get<RegistroSaida[]>(this.baseUrl2)
  }

  readById(id:string | null):Observable<RegistroSaida>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<RegistroSaida>(url)
  }


}
