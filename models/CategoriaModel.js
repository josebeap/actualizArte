class Categoria {
    constructor(id, nombre) {
      this._id = id;
      this._nombre = nombre;
    }
  
    get getId() {return this._id;}
  
    get getNombre() {return this._nombre;}
    
    // Métodos set
    set setNombre(value) {this._nombre = value;}
  }
  
  export { Categoria }