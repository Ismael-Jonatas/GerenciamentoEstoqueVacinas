import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Lote} from "../model/lote.model";
import {LoteCreate} from "../model/loteCreate.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoteService{

  baseUrl = "https://gerenciarvacina.herokuapp.com/lotevacina"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
      this.snackBar.open(msg,'X', {duration:3000,
                                                  horizontalPosition:"right",
                                                  verticalPosition:"top"})
  }

  create(lote: LoteCreate): Observable<Lote>{
    return this.http.post<Lote>(this.baseUrl, lote)
  }

  read():Observable<Lote[]>{
    const url = `${this.baseUrl}s`
    return this.http.get<Lote[]>(url)
  }

  readById(id:string | null):Observable<Lote>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Lote>(url)
  }

}
