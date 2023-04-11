class Venta {
    constructor(id, codigo, fecha, cliente) {
      this._id = id;
      this._codigo = codigo;
      this._fecha = fecha;
      this._cliente = cliente;
      this._precioTotal = 0;
      this._productosList = [];
    }
  
    // Métodos get
    get getId() {
      return this._id;
    }

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

    //Falta un metodo para devolver la lista de productos
    
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

    addProducto(value) {
        this._productosList.push(value);
    }

    dropProducto(value) {
        this._productosList.slice(this._productosList.indexOf(value), 1);
    }

  }
  
  export { Venta }