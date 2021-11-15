import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Fornecedor} from "../model/fornecedor.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn:'root'
})

export class FornecedorService{

    baseUrl = "http://localhost:8080/fornecedor"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg:string):void{
      this.snackBar.open(msg,'X',{duration:3000,
                                                horizontalPosition:"right",
                                                verticalPosition:"top"})
  }

  create(forncedor:Fornecedor):Observable<Fornecedor>{
      return this.http.post<Fornecedor>(this.baseUrl, forncedor)
  }

  read():Observable<Fornecedor[]>{
      const url = `${this.baseUrl}es`
      return this.http.get<Fornecedor[]>(url)
  }

  readById(id:string | null):Observable<Fornecedor>{
      const url = `${this.baseUrl}/${id}`
      return this.http.get<Fornecedor>(url)
  }

}
