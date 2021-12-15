import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/model/fornecedor.model';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.scss']
})
export class FornecedorCreateComponent implements OnInit {

  filterFornecedores: Fornecedor[] = [];
  fornecedores: Fornecedor[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'nome', 'cnpj'];
  fornecedor: Fornecedor = {
    nome: '',
    cnpj: ''
  }

  constructor(private fornecedorService: FornecedorService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getFornecedores();
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getFornecedores() {

    this.fornecedorService.read().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
      this.filterFornecedores = fornecedores;
    });

  }

  createFornecedor(buttonSalvar: MatButton, buttonCancelar: MatButton):void {
    if (this.loginService.getUsuarioLogado() == true){
      if(this.fornecedor.nome !== '' && this.fornecedor.cnpj !== '') {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.fornecedorService.create(this.fornecedor).subscribe(()=>{
          this.fornecedorService.showMessage("Fornecedor Cadastrado!");
          this.router.navigate(['/fornecedor'])
        })
      } else {
        this.fornecedorService.showMessage("Preencha todos os campos!");
      }
    }else{
      this.fornecedorService.showMessage("Você não Possui Privilégios!");
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterFornecedores = this.fornecedores.filter(fornecedor => {

      let validId = false;
      if(fornecedor.id !== undefined) {
        validId = fornecedor.id.toString().includes(searchText.toLowerCase());
      }
      const validName = fornecedor.nome.toLowerCase().includes(searchText.toLowerCase());
      const validCNPJ = fornecedor.cnpj.toLowerCase().includes(searchText.toLowerCase());

      return validId || validName || validCNPJ;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

