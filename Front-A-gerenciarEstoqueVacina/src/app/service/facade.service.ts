import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { FornecedorService } from "./fornecedor.service";
import { RegistroEntradaService } from "./registro-entrada.service";
import { LoteService } from "./lote.service";
import { UsuarioService } from "./usuario.service";
import { RegistroDeSaidaService } from "./registro-de-saida.service";
import { TipoVacinaService } from "./tipoVacina.service";


@Injectable({
  providedIn:'root'
})

export class FacadeService {

  constructor(private fornecedorService: FornecedorService,
              private loteService: LoteService,
              private usuarioService: UsuarioService,
              private registroEntradaService: RegistroEntradaService,
              private registroSaidaService: RegistroDeSaidaService,
              private tipoVacinaService: TipoVacinaService) {}

  private services = {
    "fornecedor": this.fornecedorService,
    "usuario": this.usuarioService,
    "lote": this.loteService,
    "registroEntrada": this.registroEntradaService,
    "registroSaida": this.registroSaidaService,
    "tipoVacina": this.tipoVacinaService
  }

  create(tipo: string, newObject: any): Observable<any> {
    return this.services[tipo].create(newObject);
  };

  read(tipo: string):Observable<any[]> {
    return this.services[tipo].read();
  }

  readById(tipo: string, id:string) : Observable<any> {
    return this.services[tipo].readById(id);
  }

  showMessage(tipo: string, message: string): Observable<any> {
    return this.services[tipo].showMessage(message);
  }
}
