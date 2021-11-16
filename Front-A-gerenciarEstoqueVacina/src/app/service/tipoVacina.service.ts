import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { TipoVacina } from "../model/tipoVacina.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TipoVacinaService{

  baseUrl = "http://localhost:8080/tipoVacina"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }

  getAll(): Observable<TipoVacina[]> {
    return this.http.get<TipoVacina[]>(this.baseUrl)
  }

  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:3000,
                                              horizontalPosition:"right",
                                              verticalPosition:"top"})
  }

  create(tipoVacina: TipoVacina): Observable<TipoVacina>{
    return this.http.post<TipoVacina>(this.baseUrl, tipoVacina)
  }


}
