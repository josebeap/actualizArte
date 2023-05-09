class Venta {
  static numVentas = 0;
    constructor(objOptions) {
      this._cliente = objOptions.cliente || '';
      this._codigo = Venta.numVentas;
      this._fecha = objOptions.fecha;
      this._precioTotal = objOptions.precioTotal;
      this._productosList = objOptions.precioTotal;
      Venta.numVentas++;
    }
  
    // Métodos get
 

    get getCodigo() {
        return this._codigo;
    }
  
    get getFecha() {
      return this._fecha;
    }

    get getCliente() {
        return this._cliente;
    }

    get getPrecioTotal() {
        return this._direccion;
    }

    get getproductosList(){
      return this._productosList;
    }

    
    // Métodos set
    set setFecha(value) {
      this._fecha = value;
    }

    set setCliente(value) {
        this._cliente = value;
    }

    set setPrecioTotal(value) {
        this._precioTotal = value;
    }

    set setproductosList(value){
      this._productosList = value;
    }

    addProducto(value) {
        this._productosList.push(value);
    }

    dropProducto(value) {
        this._productosList.slice(this._productosList.indexOf(value), 1);
    }

    //transformacion de un objeto venta a Object literal
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