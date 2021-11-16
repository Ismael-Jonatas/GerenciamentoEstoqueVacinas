import { Component, OnInit } from '@angular/core';
import {LoteService} from "../../../service/lote.service";
import {Router} from "@angular/router";
import {Lote} from "../../../model/lote.model";
import {FornecedorService} from "../../../service/fornecedor.service";
import {TipoVacinaService} from "../../../service/tipoVacina.service";
import {Fornecedor} from "../../../model/fornecedor.model";

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.scss']
})
export class LoteCreateComponent implements OnInit {

  lotevacina: Lote = {
    dataVencimento: new Date(),
    descricao: '',
    quantidade: 0,
    idFornecedor: 0,
    idTipoVacina: 0,
  }

  fornecedores!: any
  tiposVacina!: any

  constructor(private loteservice:LoteService, private router:Router, private fornecedorService:FornecedorService, private tipoVacinaService: TipoVacinaService ) { }

  ngOnInit(): void {
    this.getFornecedores()
    this.getVacina()
  }

  createLoteVacina():void{
    this.loteservice.create(this.lotevacina).subscribe(()=>{
      this.loteservice.showMessage("Lote Cadastrado!")
      this.router.navigate(['/lotevacina'])
    })
  }

  cancelCadastro():void{
    this.router.navigate(['/'])
  }


  getFornecedores(){
    this.fornecedorService.read().subscribe(fornecedores =>{
      if(fornecedores.length == 0){
        this.fornecedorService.showMessage("É necessário cadastrar um fornecodor antes!")
        this.router.navigate(['/fornecedor'])
      }else{
        this.fornecedores = fornecedores
      }
    })
  }

  getVacina(){
    this.tipoVacinaService.getAll().subscribe(tiposVacina =>{
      if(tiposVacina.length == 0){
        this.tiposVacina.showMessage("É necessário cadastrar uma vacina antes!")
        this.router.navigate(['/tipovacina'])
      }else{
        this.tiposVacina = tiposVacina
      }
    })
  }

}
