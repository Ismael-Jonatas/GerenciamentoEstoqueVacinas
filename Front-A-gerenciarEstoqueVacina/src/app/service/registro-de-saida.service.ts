import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistroSaida} from "../model/registroSaida";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistroDeSaidaService {

  baseUrl = "http://localhost:8080/registro-de-saida"
  baseUrl2 = "http://localhost:8080/registros-de-saidas"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top"})
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
