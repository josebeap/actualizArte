class Pedido {
    constructor(id, codigo, fecha, proveedor) {
      this._id = id;
      this._codigo = codigo;
      this._fecha = fecha;
      this._proveedor = proveedor;
      this._precioTotal = 0;
      this._materiaPrimaList = [];
    }
    get getId() {return this._id;}
    get getCodigo() {return this._codigo;}
    get getFecha() {return this._fecha;}
    get getProveedor() {return this._proveedor;}
    get getPrecioTotal() {return this._direccion;}
    get getListaMateriaPrima(){return this._materiaPrimaList;}
    
    set setFecha(value) {this._fecha = value;}
    set setProveedor(value) {this._proveedor = value;}
    set setPrecioTotal(value) {this._precioTotal = value;}
    addMateriaPrima(value) {this._materiaPrimaList.push(value);}
    dropMateriaPrima(value) {this._materiaPrimaList.slice(this._materiaPrimaList.indexOf(value), 1);}
  }
  
  export { Pedido }