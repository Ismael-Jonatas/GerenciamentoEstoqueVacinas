import { Component, OnInit } from '@angular/core';
import {RegistroEntrada} from "../../../model/registroEntrada";
import {Lote} from "../../../model/lote.model";
import {Usuario} from "../../../model/usuario.model";
import {LoginService} from "../../../service/login.service";
import {LoteService} from "../../../service/lote.service";
import {UsuarioService} from "../../../service/usuario.service";
import {RegistroEntradaService} from "../../../service/registro-entrada.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {

  filterRegistroEntrada: RegistroEntrada[] = [];
  registroEntradas: RegistroEntrada[] = [];
  displayedColumns: string[] = ['id', 'idUsuario', 'data','idLote','quantidade','descricao'];
  lotes: Lote[] = [];
  usuarios: Usuario[] = [];

  constructor(private loginService:LoginService, private loteService: LoteService, private usuarioService: UsuarioService, private registroEntradaService: RegistroEntradaService, private router: Router) { }

  ngOnInit(): void {
    this.getLotes();
    this.getUsuarios();
    this.getRegistrosSaidas();
  }


  async getLotes() {

    this.loteService.read().subscribe((lotes: Lote[]) => {
      this.lotes = lotes;
    });

  }

  async getUsuarios() {

    this.usuarioService.read().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });

  }

  async getRegistrosSaidas() {

    this.registroEntradaService.read().subscribe((registroEntradas: RegistroEntrada[]) => {
      this.registroEntradas = registroEntradas;
      this.filterRegistroEntrada = registroEntradas;
    });

  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterRegistroEntrada = this.registroEntradas.filter(registro => {

      let validId = false;
      if(registro.id !== undefined) {
        validId = registro.id.toString().includes(searchText.toLowerCase());
      }

      let validDate = false;
      if(registro.data !== undefined) {
        const date = registro.data.toString().split("T")[0].split("-").reverse().join("/");
        const hour = registro.data.toString().split("T")[1].split(".")[0];
        validDate = `${date} ${hour}`.includes(searchText.toLowerCase());
      }

      let validDescription = false;
      if(registro.descricao !== undefined) {
        validDescription = registro.descricao.toLowerCase().includes(searchText.toLowerCase());
      }

      let validCount = false;
      if(registro.quantidade !== undefined) {
        validCount = registro.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
      }

      let validLote = false;
      if(registro.idLote !== undefined) {
        validLote = registro.idLote.toString().toLowerCase().includes(searchText.toLowerCase());
      }

      let validUsuario = false;
      if(registro.idUsuario !== undefined) {
        validUsuario = registro.idUsuario.toString().toLowerCase().includes(searchText.toLowerCase());
      }


      return validId || validDate || validDescription || validCount || validLote || validUsuario;
    });
  }



}
