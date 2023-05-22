
import { Recurso } from "./RecursoModel";

class Producto extends Recurso {
    constructor(id, nombre, descripcion, imagen, categoria, precio, cantidadStock) {
      super(id, nombre, cantidadStock, precio);
      this._descripcion = descripcion;
      this._imagen = imagen;
      this._categoria = categoria;
      this._cantidadVendidaTotal = 0;
      this._vendidoUltimoTrimestre = 0;
      this._materiaPrimaList = [];
    }    
    get getDescripcion() {return this._descripcion;}
    get getImagen() {return this._imagen;}
    get getCategoria() {return this._categoria;} 
    get getCantidadVendidaTotal() {return this._cantidadVendidaTotal;} 
    get getVendidoUltimoTrimestre() {return this._vendidoUltimoTrimestre;}
    get getMateriaPrimaList() {const lista = this._materiaPrimaList;
      return lista;} 

    set setDescripcion(value) {this._descripcion = value;}
    set setImagen(value) {this._imagen = value;}
    set setcategoria(value) {this._categoria = value;}
    set setCantidadVendidaTotal(value) {this._cantidadVendidaTotal = value;}
    set setVendidoUltimoTrimestre(value) {this._vendidoUltimoTrimestre = value;}

    addMateriaPrima(value) {
        this._materiaPrimaList.push(value);
    }

    dropMateriaPrima(value){
        this._materiaPrimaList.slice(this._materiaPrimaList.indexOf(value), 1);
    }
  }
  
  export { Producto }