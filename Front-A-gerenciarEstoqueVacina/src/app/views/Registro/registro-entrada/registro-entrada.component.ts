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

  filterFields: string[] = ['Id','Data de Entrada','Descrição','Quantidade','Lote','Usuário'];
  filterField: string = '';
  filterRegistroEntrada: RegistroEntrada[] = [];
  registroEntradas: RegistroEntrada[] = [];
  displayedColumns: string[] = ['id', 'idUsuario', 'data','idLote','quantidade','descricao'];
  lotes: Lote[] = [];
  usuarios: Usuario[] = [];
  loaded: boolean = false;

  constructor(private loginService:LoginService, private loteService: LoteService, private usuarioService: UsuarioService, private registroEntradaService: RegistroEntradaService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.verificaLogin().then(async isLogado => {
      if(isLogado) {
        await this.getLotes();
        await this.getUsuarios();
        await this.getRegistrosSaidas();
      }
      this.loaded = true;
    });
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
    const searchText = input.value.trim();
    this.filterRegistroEntrada = this.registroEntradas.filter(registro => {

      let validId = false;
      if(registro.id !== undefined) {
        const validText = registro.id.toString().includes(searchText.toLowerCase());
        validId = validText && this.filterField === "id" || validText && this.filterField === "";
      }

      let validDate = false;
      if(registro.data !== undefined) {
        const date = registro.data.toString().split("T")[0].split("-").reverse().join("/");
        const hour = registro.data.toString().split("T")[1].split(".")[0];
        const validText = `${date} ${hour}`.includes(searchText.toLowerCase());
        validDate = validText && this.filterField === "data" || validText && this.filterField === "";
      }

      let validDescription = false;
      if(registro.descricao !== undefined) {
        const validText = registro.descricao.toLowerCase().includes(searchText.toLowerCase());
        validDescription = validText && this.filterField === "descricao" || validText && this.filterField === "";
      }

      let validCount = false;
      if(registro.quantidade !== undefined) {
        const validText = registro.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
        validCount = validText && this.filterField === "quantidade" || validText && this.filterField === "";
      }

      let validLote = false;
      if(registro.idLote !== undefined) {
        const validText = registro.idLote.toString().toLowerCase().includes(searchText.toLowerCase());
        validLote = validText && this.filterField === "idLote" || validText && this.filterField === "";
      }

      let validUsuario = false;
      if(registro.idUsuario !== undefined) {
        const validText = registro.idUsuario.toString().toLowerCase().includes(searchText.toLowerCase());
        validUsuario = validText && this.filterField === "idUsuario" || validText && this.filterField === "";
      }


      return validId || validDate || validDescription || validCount || validLote || validUsuario;
    });
  }



}