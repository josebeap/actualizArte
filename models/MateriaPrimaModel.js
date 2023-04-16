import { Recurso } from "./RecursoModel";

class MateriaPrima extends Recurso {
    constructor(id, nombre, precio, cantidadStock) {
      super(id, nombre, cantidadStock, precio);
      this._cantidadUsadaTotal = 0;
      this._usadaUltimoTrimestre = 0;
    }
  
    // Métodos get
    get getCantidadUsadaTotal() {
      return this._cantidadUsadaTotal;
    }
  
    get getUsadaUltimoTrimestre() {
      return this._usadaUltimoTrimestre;
    }
  
    // Métodos set
    set setCantidadUsadaTotal(value) {
      this._cantidadUsadaTotal = value;
    }
  
    set setUsadaUltimoTrimestre(value) {
      this._usadaUltimoTrimestre = value;
    }
  }
  
  export { MateriaPrima }