class Venta {
  
    constructor(objOptions) {
      this._cliente = objOptions.cliente || '';
      this._codigo = objOptions.codigo;
      this._fecha = objOptions.fecha;
      this._precioTotal = objOptions.precioTotal;
      this._productosList = objOptions.productosList || [];     
    }

    get getCodigo() {return this._codigo;}
    get getFecha() {return this._fecha;}
    get getCliente() {return this._cliente;}
    get getPrecioTotal() {return this._precioTotal;}
    get getproductosList(){return this._productosList;}

    set setFecha(value) {this._fecha = value;}
    set setCliente(value) {this._cliente = value;}
    set setPrecioTotal(value) {this._precioTotal = value;}
    set setproductosList(value){this._productosList = value;}
    addProducto(value) {this._productosList.push(value);}

    dropProducto(value) {
        this._productosList.slice(this._productosList.indexOf(value), 1);
    }

    //pirqué se necesta trabajar con abstracciones Object (más que objVenta) 
    toObject() {
      return {
          cliente: this._cliente,
          codigo: this._codigo,
          fecha: this._fecha,
          precioTotal: this._precioTotal,
          productosList: this._productosList
      };
  }

  }
  
  export { Venta }