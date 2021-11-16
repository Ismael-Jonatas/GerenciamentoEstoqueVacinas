import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { TipoVacina } from "../model/tipoVacina.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TipoVacinaService{

  baseUrl = "http://localhost:8080/tipovacina"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
      this.snackBar.open(msg,'X',{duration:3000,
                                                horizontalPosition:"right",
                                                verticalPosition:"top"})
  }

  create(tipoVacina:TipoVacina):Observable<TipoVacina>{
      return this.http.post<TipoVacina>(this.baseUrl, tipoVacina)
  }

  read():Observable<TipoVacina[]>{
      const url = `${this.baseUrl}s`
      return this.http.get<TipoVacina[]>(url)
  }

  readById(id:string | null):Observable<TipoVacina>{
      const url = `${this.baseUrl}/${id}`
      return this.http.get<TipoVacina>(url)
  }

}
