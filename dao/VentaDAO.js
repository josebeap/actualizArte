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
  orderBy,
} from "firebase/firestore";
import { Venta } from "../models/VentaModel";

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

  static async formatoFecha(fecha) {
    const nuevoFormato = fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return nuevoFormato;
  }

  // Método para obtener todas las ventas apartir de una fecha
  static async ventasXFecha(fecha) {
    let mes = fecha.getMonth();
    let year = fecha.getFullYear();

    const fechaInicio = new Date(year, mes, 1);
    const fechaFin = new Date(year, mes + 1, 1);

    const db = collection(FIRESTORE_DB, "Venta");
    const consulta = query(
      db,
      where("fecha", ">=", fechaInicio),
      where("fecha", "<", fechaFin),
      orderBy("fecha")
    );

    const querySnapshot = await getDocs(consulta);
    const ventas = [];

    querySnapshot.forEach((doc) => {
      const data = new Venta(doc.data());
      ventas.push(data);
    });
    return ventas;
  }
}

export { VentaDAO };
