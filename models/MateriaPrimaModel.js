class MateriaPrima extends Recurso {
    constructor(id, nombre, cantidadStock, precio) {
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
    set setCantidadVendidaTotal(value) {
      this._cantidadUsadaTotal = value;
    }
  
    set setVendidoUltimoTrimestre(value) {
      this._usadaUltimoTrimestre = value;
    }
  }
  
  export { MateriaPrima }