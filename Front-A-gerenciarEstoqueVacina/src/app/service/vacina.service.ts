
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vacina} from "../model/vacina.model";

@Injectable({
  providedIn:'root'
})

export class VacinaService{

  baseUrl = "http://localhost:8080/tipovacina"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
    this.snackBar.open(msg,'X',{duration:3000,
                                              horizontalPosition:"right",
                                              verticalPosition:"top"})
  }

  create(vacina:Vacina):Observable<Vacina>{
    return this.http.post<Vacina>(this.baseUrl, vacina)
  }

  read():Observable<Vacina[]>{
    const url = `${this.baseUrl}s`
    return this.http.get<Vacina[]>(url)
  }

  readById(id:string | null):Observable<Vacina>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Vacina>(url)
  }



}
