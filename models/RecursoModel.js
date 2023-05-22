class Recurso {
    constructor(id, nombre, cantidadStock, precio) {
      this._id = id;
      this._nombre = nombre;
      this._cantidadStock = cantidadStock;
      this._precio = precio;
    }

    get getId() {return this._id;}
    get getNombre() {return this._nombre;}
    get getCantidadStock() {return this._cantidadStock;}
    get getPrecio() {return this._precio;}
    set setNombre(value) {this._nombre = value;}
    set setCantidadStock(value) {this._cantidadStock = value;}
    set setPrecio(value) {this._precio = value;}
  }

  export { Recurso }