import { Recurso } from "./RecursoModel";

class MateriaPrima extends Recurso {
    constructor(id, nombre, precio, cantidadStock) {
      super(id, nombre, cantidadStock, precio);
      this._cantidadUsadaTotal = 0;
      this._usadaUltimoTrimestre = 0;
    }

    get getCantidadUsadaTotal() {return this._cantidadUsadaTotal;}
    get getUsadaUltimoTrimestre() {return this._usadaUltimoTrimestre;}

    set setCantidadUsadaTotal(value) {this._cantidadUsadaTotal = value;}
    set setUsadaUltimoTrimestre(value) {this._usadaUltimoTrimestre = value;}
  }
  
  export { MateriaPrima }