class Proveedor {
    constructor(id, nit, nombre, telefono, direccion, correo) {
      this._id = id;
      this._nit = nit;
      this._nombre = nombre;
      this._telefono = telefono;
      this._direccion = direccion;
      this._correo = correo;
    }
  
    get getId() {return this._id;}
    get getNit() {return this._nit;}
    get getNombre() {return this._nombre;}
    get getTelefono() {return this._telefono;}
    get getDireccion() {return this._direccion;}
    get getCorreo() {return this._correo;}
    
    set setNit(value) {this._nit = value;}
    set setNombre(value) {this._nombre = value;}
    set setTelefono(value) {this._telefono = value;}
    set setDireccion(value) {this._direccion = value;}
    set setCorreo(value) {this._correo = value;}
  }
  
  export { Proveedor }