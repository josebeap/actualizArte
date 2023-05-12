import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { Venta } from "../models/VentaModel";
import "firebase/firestore";

class VentaDAO {
  // Método para obtener una referencia a la colección "venta" en Firebase
  static getCollection() {
    return collection(FIRESTORE_DB, "Venta");
  }

  // Método para obtener un venta por el id
  static async findById(Id) {
    const ref = doc(FIRESTORE_DB, `Pedido/${Id}`);
    const documento = await getDoc(ref);
    const datos = documento.data();
    const venta = new Venta(
      documento.id,
      datos.codigo,
      datos.fecha,
      datos.cliente
    );
    venta.setPrecioTotal(datos.precioTotal);
    //productosList.forEach(prod => venta.addProducto(prod))
    return venta;
  }

  // Método para insertar un venta en Firebase
  static async insertarNuevaVenta(venta) {
    const ventaRef = collection(FIRESTORE_DB, "Venta");
    await addDoc(ventaRef, venta);
  }

  // Método para actualizar un venta en Firebase
  static async update(venta) {
    const ref = doc(FIRESTORE_DB, `Venta/${venta.getId}`);
    await updateDoc(ref, {
      nombre: venta.getNombre,
      fecha: venta.getFecha,
      cliente: venta.getCliente,
      precioTotal: venta.getPrecioTotal,
    });
  }

  //Metodo que obtiene la cantidad de ventas registradas
  static async getNumeroVentas() {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Venta"));
    return querySnapshot.size;
  }

  // Método para eliminar un venta de Firebase
  static async delete(venta) {
    const ref = doc(FIRESTORE_DB, `Venta/${venta.getId}`);
    await deleteDoc(ref);
  }

  // Método para obtener todas las ventas apartir de una fecha
  static async ventasXFecha(fecha) {
    console.log(fecha);
    let partesFecha = fecha.split('/');
    let mes = parseInt(partesFecha[1]) ;

    console.log(partesFecha);
    console.log(mes);
    const fechaInicio = new Date(`${partesFecha[0]}-${(mes - 1).toString()}-${partesFecha[2]}`);
    const fechaFin = new Date(`${partesFecha[0]}-${ (mes + 1).toString()}-${partesFecha[2]}`);

    console.log(fechaInicio + 'inicio fecha');
    console.log(fechaFin + 'fin fecha');
    const db = collection(FIRESTORE_DB, "Venta");
    const consulta = query(db,
        where('fecha', '>', fechaInicio),
        where('fecha', '<', fechaFin),
        orderBy('fecha'));

        console.log(consulta);
    
    const querySnapshot = await getDocs(consulta);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.precioTotal, " => ", doc.data());
    });
  }


}

export { VentaDAO };
