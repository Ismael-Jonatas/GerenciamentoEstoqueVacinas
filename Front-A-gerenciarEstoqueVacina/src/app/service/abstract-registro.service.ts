import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

// Template Method
export abstract class AbstractRegistroService {

  abstract baseUrl: string;
  abstract baseUrl2: string;

  constructor(public snackBar: MatSnackBar) {}

  public showMessage(msg:string):void{
    this.snackBar.open(msg,'X', {duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top"})
  }

  abstract create(param :any): Observable<any>;

  abstract read(): Observable<any>;

  abstract readById(id:string | null): Observable<any>;

}
