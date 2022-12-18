import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent {
  nombreGasto:string = "";
  cantidad:number = 0;
  formularioIncorrecto:boolean=false;
  textIncorrecto:string="";

  constructor(private _presupuestoService:PresupuestoService){
    
  }

  agregarGasto(){
    
    if(this.nombreGasto ==="" || this.cantidad <=0){
      this.formularioIncorrecto=true;
      this.textIncorrecto="Nombre gasto o cantidad incorrectos";
    }
    else{
      if(this.cantidad > this._presupuestoService.restante){
        this.formularioIncorrecto=true;
        this.textIncorrecto="Cantidad ingresada es mayor al restante";
        return;
      }
      this.formularioIncorrecto=false;
      //Creamos el objeto
      const GASTO={
        nombre:this.nombreGasto,
        cantidad:this.cantidad
      }
      //Enviamos el objeto a los subscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);

      //Reseteamos formulario
      this.nombreGasto="";
      this.cantidad=0;
    }
  }
}
